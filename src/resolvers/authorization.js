import {ForbiddenError} from "apollo-server";
import {skip} from "graphql-resolvers";

export const isAuthenticated = (parent, args, {me}) => 
    me ? skip : new ForbiddenError('Not Authenticated as user');
