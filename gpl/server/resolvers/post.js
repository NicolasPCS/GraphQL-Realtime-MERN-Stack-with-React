const {
    gql
} = require('apollo-server-express');
const {
    posts
} = require('../temp.js');

// queries
const totalPosts = () => posts.length;
const allPosts = () => posts;

// Resolver for mutation
const newPost = (parent, args) => {
    // console.log(args);
    // Create a new post object
    const post = {
        id: posts.length + 1,
        title: args.input.title,
        description: args.input.description
    };
    // Push new post object to posts array
    posts.push(post);
    return post;

}

module.exports = {
    Query: {
        totalPosts,
        allPosts
    },
    Mutation: {
        newPost
    }
};