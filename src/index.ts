import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import resolvers from './resolvers/index.js';
import express from "express";
import context from "./context.js";
import { generateToken, verifyToken } from './auth/jwt.js';
import * as config from './config.js';

//passport----------------------------------------------------------------
import passport from 'passport';
import session from 'express-session';
import {googleStrategy} from './auth/google-strategy.js';

const app = express();
// passport
app.use(
  session({
    secret: config.APP_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);

app.get('/auth/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));

app.get('/auth/google/callback', passport.authenticate( 'google',
  {
   failureRedirect: '/loginerror',
   successRedirect: '/loginsucess',
   failureMessage: true
  }
));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, user);
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

app.get('/loginsucess', async (req: any, res)=>{
  const jwt = await generateToken({
    id: req.user.id,
    email: req.user.emails[0]
  });


  res.send({
    login:{
      status:'success',
      jwt,
    }
  });
});

app.get('/loginerror', (req, res)=>{
  res.send({
    login:{
      status:'error',
    }
  });
});


// graphql
const typeDefs = readFileSync('./src/schema.graphql', {encoding: 'utf-8'})

function createApolloServer(){
  return new ApolloServer({
    typeDefs, resolvers, context
  });
}


async function startServer( server: ApolloServer ){
  await server.start();
  await server.applyMiddleware({
    app, path:'/graphql'
  });
}

const apolloServer = createApolloServer();
startServer(apolloServer);

const authUrl = `http://localhost:${config.PORT}/auth/google`;
const graphqlUrl = `http://localhost:${config.PORT}/graphql`;

const expresseServer = app.listen(
  {port: config.PORT},
  ()=>{
    console.log(`🚀 Auth Server ready at ${authUrl}`);
    console.log(`🚀 Graphql Server ready at ${graphqlUrl}`);
  }
);

const urls = {
  auth: authUrl,
  graphql: graphqlUrl
}

export { apolloServer, expresseServer, urls};
