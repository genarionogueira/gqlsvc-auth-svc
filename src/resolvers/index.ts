import { MutationResolvers, Resolvers, QueryResolvers } from '../generated/graphql.js';

const queries: QueryResolvers = {
    books: async (_,__, contextValue)=>{
      return contextValue.dataSources.booksAPI.getBooks()
    },
    users: async (_,__, contextValue)=>{
      return contextValue.dataSources.usersAPI.getAll()
    }
  }

const mutations: MutationResolvers = {
  addBook: async (_, {title, author}, {dataSources}) =>{
    return dataSources.booksAPI.addBook({title, author})
  },
}

const resolvers: Resolvers = {
    Query: queries,
    Mutation: mutations
};

export default resolvers
