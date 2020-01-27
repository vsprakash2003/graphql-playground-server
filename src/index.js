import "dotenv/config"
import cors from "cors"
import express from "express"
import {ApolloServer, AuthenticationError} from "apollo-server-express";
import jwt from "jsonwebtoken";

import schema from "./schema";
import resolvers from "./resolvers";
import models, {sequelize} from "./models";

const app = express()
app.use(cors())

const getMe = async req => {
    const token = req.headers['x-token'];

    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (e) {
            throw new AuthenticationError(
                "Your session expired. Sign in again",
            );
        }
    }
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError: error => {
        //remove the internal sequelize error message
        //leave only the important validation error
        const message = error.message
            .replace('SequelizeValidationError: ', '')
            .replace('Validation error: ', '');

            return{
                ...error,
                message,
            };
    },
    context: async ({req}) => {
        const me = await getMe(req);

        return {
        models,
        me,
        secret: process.env.SECRET,
    };
},
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
        email: 'hello@prakash.com',
        password: 'hello',
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
        email: 'hello@anika.com',
        password: 'hola',
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
