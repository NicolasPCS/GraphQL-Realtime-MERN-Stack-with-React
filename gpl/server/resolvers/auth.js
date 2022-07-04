const {gql} = require('apollo-server-express')

const me = () => 'Nicolas';

module.exports = {
    Query: {
        me
    }
};