import jwt from 'jsonwebtoken';
import * as config from '../config.js';
import { User } from '../generated/graphql.js';

interface JwtPayload {
    id: string;
    email: string;
}

async function verifyToken (token: string): Promise<User | null> {
    try {
        return await jwt.verify(token, config.APP_SECRET) as User;
    } catch (e) {
        return null;
    }
}

async function generateToken(jwtPayload: JwtPayload): Promise<string> {
    return await jwt.sign(jwtPayload, config.APP_SECRET, {
        expiresIn: '1h',
    });
}


export {
    verifyToken, generateToken, JwtPayload
}
