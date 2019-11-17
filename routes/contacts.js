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

function contactsApi(app) {
  const router = express.Router();
  app.use('/api/contacts', router);

  const contactsService = new ContactsService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:contacts']),
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;
      try {
        const contacts = await contactsService.getContacts({ tags });

        res.status(200).json({
          data: contacts,
          message: 'contacts listed'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/:contactId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:contacts']),
    validationHandler({ contactId: contactIdSchema }, 'params'),
    async function (req, res, next) {
      cacheResponse(req, SIXTY_MINUTES_IN_SECONDS);
      const { contactId } = req.params;
      try {
        const contacts = await contactsService.getContact({ contactId });

        res.status(200).json({
          data: contacts,
          message: 'contact retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:contacts']),
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
    scopesValidationHandler(['update:contacts']),
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
    scopesValidationHandler(['delete:contacts']),
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

module.exports = contactsApi;