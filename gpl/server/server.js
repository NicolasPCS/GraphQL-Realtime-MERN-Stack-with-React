const {ApolloServer} = require('apollo-server-express')
const express = require('express')
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()
const {fileLoader, mergeTypes, mergeResolvers} = require('merge-graphql-schemas')

// Express server
const app = express()

// DB
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE_CLOUD, {
            useNewURLParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected');
    } catch (error) {
        console.log('DB Connection error', error);
    }
}

// Execute DB Connection
db();

// TypeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));

// Resolvers
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

// Apollo server
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });
    await apolloServer.start();
    // applyMiddleware
    apolloServer.applyMiddleware({
        app
    });
}

startServer();

// Server
const httpServer = http.createServer(app);

// Rest endpoint
app.get('/rest', function (req, res) {
    res.json({
        data: 'You hit rest endpoint great!'
    });
});

// Port
app.listen(process.env.PORT, function () {
    console.log(`Server is ready at htpp://localhost:${process.env.PORT}`);
    console.log(`GrapQL server is ready at htpp://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
});