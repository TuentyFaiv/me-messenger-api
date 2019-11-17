const messagesMock = [
  {
    "id": "7f8ac072-abc8-4f68-9bcc-a10ea8522092",
    "from": "ef199d70-c703-4f1c-9e57-1cabe59a799a",
    "type": "text",
    "content": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    "created_at": "10/12/2019",
    "updated_at": "10/11/2019"
  },
  {
    "id": "ee33f546-27ae-4c1b-84b7-a667b044e213",
    "from": "ee33f546-27ae-4c1b-84b7-a667b044e707",
    "type": "text",
    "content": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    "created_at": "10/12/2019",
    "updated_at": "10/11/2019"
  },
  {
    "id": "0fb916d4-105e-442e-bacb-fdeea2a3d213",
    "from": "0fb916d4-105e-442e-bacb-fdeea2a3d1b5",
    "type": "text",
    "content": "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
    "created_at": "7/22/2019",
    "updated_at": "7/17/2019"
  },
  {
    "id": "3c704193-6da7-4bb2-b36a-970b6816b213",
    "from": "3c704193-6da7-4bb2-b36a-970b6816b4f1",
    "type": "text",
    "content": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    "created_at": "4/28/2019",
    "updated_at": "12/15/2018"
  },
  {
    "id": "b2460786-daae-4aaf-ab78-142864b22213",
    "from": "b2460786-daae-4aaf-ab78-142864b22279",
    "type": "text",
    "content": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    "created_at": "10/24/2018",
    "updated_at": "10/4/2019"
  },
  {
    "id": "4b34a5b8-ba5d-48e2-be6e-104694ce7213",
    "from": "4b34a5b8-ba5d-48e2-be6e-104694ce76d7",
    "type": "text",
    "content": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    "created_at": "1/14/2019",
    "updated_at": "5/17/2019"
  },
  {
    "id": "d89763bf-34b8-4197-be9c-348332d17213",
    "from": "d89763bf-34b8-4197-be9c-348332d1710a",
    "type": "text",
    "content": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    "created_at": "6/4/2019",
    "updated_at": "12/2/2018"
  },
  {
    "id": "9d0f0df6-6390-4685-905c-5fc683606213",
    "from": "9d0f0df6-6390-4685-905c-5fc683606d99",
    "type": "text",
    "content": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    "created_at": "8/31/2019",
    "updated_at": "6/17/2019"
  },
  {
    "id": "61f9b209-7141-4afb-9736-2353c5d9d213",
    "from": "61f9b209-7141-4afb-9736-2353c5d9d79b",
    "type": "text",
    "content": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    "created_at": "9/29/2019",
    "updated_at": "3/31/2019"
  },
  {
    "id": "4e940e66-f5ed-437a-8290-52a63fda6213",
    "from": "4e940e66-f5ed-437a-8290-52a63fda6c81",
    "type": "text",
    "content": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    "created_at": "3/18/2019",
    "updated_at": "12/27/2018"
  },
  {
    "id": "2fe4eaca-ed79-449b-9d13-148c3763f213",
    "from": "2fe4eaca-ed79-449b-9d13-148c3763fb5a",
    "type": "text",
    "content": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    "created_at": "1/26/2019",
    "updated_at": "10/11/2019"
  },
  {
    "id": "cb5d8905-0bdf-4feb-a77f-d0f01787d213",
    "from": "cb5d8905-0bdf-4feb-a77f-d0f01787d640",
    "type": "text",
    "content": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    "created_at": "4/25/2019",
    "updated_at": "6/17/2019"
  },
  {
    "id": "2507551b-d45c-480d-b693-e92255954213",
    "from": "2507551b-d45c-480d-b693-e9225595469d",
    "type": "text",
    "content": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
    "created_at": "5/31/2019",
    "updated_at": "8/4/2019"
  },
  {
    "id": "4e17f275-80d2-498a-848e-a356a8f28213",
    "from": "4e17f275-80d2-498a-848e-a356a8f285a8",
    "type": "text",
    "content": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    "created_at": "4/11/2019",
    "updated_at": "11/26/2018"
  },
  {
    "id": "88a73bc9-af06-4d80-abf9-c2f5e280d213",
    "from": "88a73bc9-af06-4d80-abf9-c2f5e280dbf8",
    "type": "text",
    "content": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    "created_at": "9/4/2019",
    "updated_at": "6/25/2019"
  },
  {
    "id": "048814b1-3505-4dd1-a4f7-d40632236213",
    "from": "048814b1-3505-4dd1-a4f7-d406322364bc",
    "type": "text",
    "content": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    "created_at": "1/2/2019",
    "updated_at": "8/29/2019"
  }
];

module.exports = {
  messagesMock
};