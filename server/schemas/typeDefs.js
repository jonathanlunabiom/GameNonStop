const typeDefs = `

type Query {
  _empty: String
}

type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
  
  type AuthPayload {
    token: String
    user: User
  }
  `;
module.exports = typeDefs;