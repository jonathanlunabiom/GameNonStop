const db = require("./connection");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");

  const categories = await Category.insertMany([
    { name: "Shooter" },
    { name: "Platforms" },
    { name: "Adventure" },
    { name: "Action" },
    { name: "RPG" },
  ]);

  console.log("categories seeded");

  await Product.insertMany([
    {
      name: "God of war",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 60.99,
      category: categories[4]._id,
    },
    {
      name: "Mario 3D World",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 60.99,
      category: categories[1]._id,
    },
    {
      name: "Assassin's Creed",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 60.99,
      category: categories[4]._id,
    },
    {
      name: "Far Cry",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 60.99,
      category: categories[3]._id,
    },
    {
      name: "Pokemon",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 60.99,
      category: categories[4]._id,
    },
    {
      name: "Pokemon",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 2.99,
      category: categories[4]._id,
    },
  ]);

  console.log("products seeded");

  await User.create({
    username: "Learn",
    email: "learn@gmail.com",
    password: "1234567890",
  });

  console.log("users seeded");

  process.exit();
});
