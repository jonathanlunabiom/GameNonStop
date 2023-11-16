const db = require("./connection");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");

  const categories = await Category.insertMany([
    { name: "Shooter" },
    { name: "RPG" },
    { name: "Adventure" },
  ]);

  console.log("categories seeded");

  await Product.insertMany([
    {
      name: "God of war",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 2.99,
      category: categories[0]._id,
    },
  ]);

  console.log("products seeded");

  await User.create({
    username: "Learn",
    email: "learn@gmailx.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
