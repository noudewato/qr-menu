const bcrypt = require('bcryptjs')

const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "John Doe",
    email: "john@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "Fawaz Noudewato",
    email: "fawaz@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users