const express = require('express');
const passport = require('passport');
const ContactsService = require('../services/contacts');

const {
  contactIdSchema,
  createContactSchema,
  updateContactSchema
} = require('../utils/schemas/contacts');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

//JWT strategy
require('../utils/auth/strategies/jwt');

function contactsUserApi(app) {
  const router = express.Router();
  app.use('/api/contacts/user', router);

  const contactsService = new ContactsService();

  router.get(
    "/search",
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-contacts']),
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { email } = req.query;
      try {
        const searchContacts = await contactsService.searchUser({ email });
        const users = searchContacts.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email
        }));

        res.status(200).json({
          data: users,
          message: 'contacts searched'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/:contactOf",
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-contacts']),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { contactOf } = req.params;

      try {
        const contactsOfUser = await contactsService.getContacts({ contactOf });

        res.status(200).json({
          data: contactsOfUser,
          message: 'contacts of user retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-contacts']),
    validationHandler(createContactSchema),
    async function (req, res, next) {
      const { body: contact } = req;

      try {
        const createContactId = await contactsService.createContact({ contact });
        res.status(201).json({
          data: createContactId,
          message: 'contact created'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:contactId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:user-contacts']),
    validationHandler({ contactId: contactIdSchema }, 'params'),
    validationHandler(updateContactSchema),
    async function (req, res, next) {
      const { contactId } = req.params;
      const { body: contact } = req;

      try {
        const updatedContactId = await contactsService.updateContact({
          contactId,
          contact
        });

        res.status(200).json({
          data: updatedContactId,
          message: 'contact updated'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:contactId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-contacts']),
    validationHandler({ contactId: contactIdSchema }, 'params'),
    async function (req, res, next) {
      const { contactId } = req.params;

      try {
        const deletedContact = await contactsService.deleteContact({ contactId });

        res.status(200).json({
          data: deletedContact,
          message: 'contact deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = contactsUserApi;