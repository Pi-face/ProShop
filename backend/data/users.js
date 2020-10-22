import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Cena",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Mary Jane",
    email: "mary@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
