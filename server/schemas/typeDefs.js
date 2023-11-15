const typeDefs = `
type Category {
  _id: ID
  name: String!
}

type Product {
  _id: ID
  name: String
  image: String
  quantity: Int
  price: Float
  category: Category
}

type Cart {
  _id: ID
  purchaseDate: String
  cartProducts: [Product]
}

type User {
  _id: ID
  username: String!
  email: String!
  orders: [Cart]
}

type Favorites {
  _id: ID!
  name: String
}

type Checkout {
  session: ID
}

type Auth {
  token: String
  user: User
}

type Query{
  categories: [Category]
  me: [User]
  order(_id: ID!): Cart
}

type Mutation {
  register(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addOrder(products: [ID]!): Cart
  addtoFavorites (name: String, id: ID!): Favorites 
}

`;
module.exports = typeDefs;
