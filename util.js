import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'

export function decodeToken(contextValue) {
    const token = contextValue.token.split(' ')
    if(token.length == 1) {
        throw new GraphQLError('Invalid Authorization...', {
            extensions:{code: 'FORBIDDEN'}
        })
    }
    else {
        const decode = jwt.verify(token[1], process.env.SECRET_HASH)
        return {
            ...decode,
            valid: true
        }
    }
    return {'valid': false}
    
}