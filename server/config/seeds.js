const db = require("./connection");
const {Product} = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Product", "products");

  await Product.insertMany([
    {
      name: "God of war",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 60.99,
      category: "RPG",
    },
    {
      name: "Mario 3D World",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 60.99,
      category: "Platforms",
    },
    {
      name: "Assassin's Creed",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 60.99,
      category: "Action",
    },
    {
      name: "Far Cry",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 60.99,
      category: "Action",
    },
    {
      name: "Pokemon",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 60.99,
      category: "RPG",
    },
    {
      name: "Call of Duty",
      image:
        "https://w7.pngwing.com/pngs/388/86/png-transparent-spiderman-cartoon.png",
      price: 2.99,
      category: "Shooter",
    },
  ]);

  console.log("products seeded");

  process.exit();
});
