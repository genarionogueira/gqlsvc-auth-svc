import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';

import { BooksDataSource } from './datasources/books-datasources.js';

import resolvers from './resolvers/index.js';

export interface MyContext {
  dataSources: {
    booksAPI: BooksDataSource
  };
}

const typeDefs = readFileSync('./src/schema.graphql', {encoding: 'utf-8'})

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({req, res}) => {
      const { cache } = server;
      const token = req.headers.authorization || '';
      return {
        dataSources: {
          booksAPI: new BooksDataSource(),
        }
      }
    }
});
  
console.log(`🚀  Server ready at: ${url}`);