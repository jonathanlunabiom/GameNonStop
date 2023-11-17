const typeDefs = `

type Product {
  _id: ID
  name: String
  image: String
  quantity: Int
  price: Float
  category: String
}

type Cart {
  _id: ID
  purchaseDate: String
  cartProducts: [Product]
}
type Games {
  ownedGames: [ID!]
}

type User {
  _id: ID
  username: String!
  email: String!
  wishlist: [Favorites]
  orders: [Cart]
  games: [Games]
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

type Checkout {
  session: ID
}

input ProductInput {
  _id: ID
  purchaseQuantity: Int
  name: String
  image: String
  price: Float
  quantity: Int
}

type Query{
  profile: User
  order(_id: [ID!]!): Cart 
  products: [Product]
  product(_id: ID!): Product
  checkout(products: [ProductInput]): Checkout
}

type Mutation {
  register(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addOrder(products: [ID]!): Cart
  addtoFavorites (_id: ID!): Product
}
`;
module.exports = typeDefs;
