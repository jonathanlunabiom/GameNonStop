const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const cors = require('cors'); 
const { authMiddleware } = require("./utils/auth");
const stripe = require ('stripe') ("sk_test_51OCqBSIHMJDsY8j8dZq0fUPBDORHladp9fsLACYR66K02tXbkGHDKNTyEwuLRb5TvEXCNXtqNAwNkgDIDEn3m6Ho00oqXTbVRt")

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use(
    "/images",
    express.static(path.join(__dirname, "../client/public/images"))
  );

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  app.post('/payment', async (req,res) => {
    const{items,currency} = req.body;

    const paymentIntents = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency:currency
    }) 
    res.json({ clientSecret: paymentIntents.client_secret });
    function calculateOrderAmount(items) {
      return 1000;
    }
    
  })
  

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};



// Call the async function to start the server
startApolloServer();
