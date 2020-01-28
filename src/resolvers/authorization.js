import {ForbiddenError} from "apollo-server";
import {combineResolvers, skip} from "graphql-resolvers";

export const isAuthenticated = (parent, args, {me}) => 
    me ? skip : new ForbiddenError('Not Authenticated as user');

export const isAdmin = combineResolvers(
    isAuthenticated,
    (parent, args, {me: {role}}) =>
    role === 'ADMIN'
        ? skip  
        : new ForbiddenError('Not Authenticated as admin.')
)

export const isMessageOwner = async (
    parent,
    {id},
    {models,me},
) => {
    const message = await models.Message.findById(id, {raw:true});
    if (message.userId !== me.userId) {
        throw new ForbiddenError('Not Authenticated as owner');
    }

    return skip;
};