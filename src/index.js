import "dotenv/config"
import cors from "cors"
import express from "express"
import {ApolloServer} from "apollo-server-express";

import schema from "./schema";
import resolvers from "./resolvers";
import models, {sequelize} from "./models";

const app = express()
app.use(cors())

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async () => ({
        models,
        me: models.User.findByLogin('vsprakash2003')
    }),
});

server.applyMiddleware({app, path: '/graphql'})

const eraseDatabaseOnSync = true;

sequelize.sync({force: eraseDatabaseOnSync}).then(async () => {
    if(eraseDatabaseOnSync) {
        createUsersWithMessages();
    }

    app.listen({port: 8000},() => {
        console.log("Apollo Server listening on http://localhost:8000/graphql")
    });
});

const createUsersWithMessages = async () => {
    await models.User.create({
        username: 'vsprakash2003',
        messages: [
            {
            text: 'Check my git repositories',
            },
        ],
    },
    {
        include: [models.Message],
    },
    );

    await models.User.create({
        username: 'anikap',
        messages: [
            {
                text: 'Check my work ....',
            },
            {
                text: 'Check all other works ....',
            },
        ],
    },
    {
        include: [models.Message],
    },
    );
};
