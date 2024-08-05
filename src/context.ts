import { GraphQLError } from 'graphql';
import { JwtPayload, verifyToken } from './auth/jwt.js';
import { BooksDataSource } from './datasources/books-datasources.js';
import { User } from './generated/graphql.js';
import { getUser, UsersDataSource } from './datasources/users-datasource.js';

export interface MyContext {
    user: User;
    dataSources: {
        booksAPI: BooksDataSource;
        usersAPI: UsersDataSource;
    };
}

const context = async ({req, res}) => {

    const jwtToken = req.headers.authorization || '';
    const jwtPayload: JwtPayload = await verifyToken(jwtToken);
    const user: User = getUser(jwtPayload.id);

    if(!user) throw new GraphQLError('User is not authenticated',{
        extensions: {
            code: "UNAUTHENTICATED",
            http: {status: 401}
        }
    });

    return {
        user,
        dataSources: {
            booksAPI: new BooksDataSource(),
            usersAPI: new UsersDataSource(user),
        },
    };
};

export default context;
