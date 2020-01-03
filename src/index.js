import "dotenv/config"
import cors from "cors"
import express from "express"
import {ApolloServer, gql} from "apollo-server-express"

const app = express()
app.use(cors())

const schema = gql`
    type Query {
        users: [User!]
        me: User
        user(id: ID!): User
    }

    type User {
        id: ID!
        username: String!
    }
`
let users = {
    1: {
        id: '1',
        username: 'Prakash V',
    },
    2: {
        id: '2',
        username: 'Anika'
    },
};

const me = users[1];

const resolvers = {
    Query: {
        me: () => {
            return me;
        },

        user: (parent, {id}) => {
            return users[id];
        },

        users:() => {
            return Object.values(users);
        },
    },

    User: {
        username: () => 'Sumathee'
    },
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
})

server.applyMiddleware({app, path: '/graphql'})

app.listen({port: 8000},() => {
    console.log("Apollo Server listening on http://localhost:8000/graphql")
})