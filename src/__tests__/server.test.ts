// we need to import this to use
import { expect, beforeAll, describe, it,afterAll} from '@jest/globals';

import { readFileSync } from 'fs';
import { apolloServer, urls, expresseServer } from '../../src/index';
import { generateToken } from '../auth/jwt';
import  request  from 'supertest';
import { ApolloServer } from 'apollo-server-express';
import { User } from '../generated/graphql';

describe('Server End-to-End Test', () => {

  let server: ApolloServer;
  let headers: Record<string, string>;
  let testUser: User;

  beforeAll(async () => {

    //test user
    testUser = {
      id: '1',
      email: 'test.user@gmail.com',
      roles: [
        {
          id: 'admin',
          name: 'administrador'
        }
      ]
    }

    //start the server
    server = apolloServer;

    //generate a token
    const token = await generateToken({
      id: testUser.id,
      email: testUser.email
    })

    //headers
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    }

  });

  afterAll(async () => {
    //stop the server
    await server.stop();
    await expresseServer.close();

  });


  it('Query Users', async () => {

    const query = readFileSync('./src/__tests__/queries/users.graphql', { encoding: 'utf-8' });
    const response = await request(urls.graphql).post('/').set(headers)
    .send({
      query: query,
      variables: {}
    });

    expect(response.errors).toBeUndefined();
    expect(response.body.error).toBeUndefined();

    const testUserResponse: User = response.body.data.users.find(
      (user: User) => user.email == testUser.email
    );

    expect(testUserResponse).toEqual(testUser);

  });
});
