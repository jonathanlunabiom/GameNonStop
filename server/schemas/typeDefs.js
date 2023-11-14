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

type Checkout {
  session: ID
}

type Auth {
  token: String
  user: User
}

type Query{
  categories: [Category]
}

type Mutation {
  register(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
}

`;
module.exports = typeDefs;
