import userModel from '../../mongooseModels/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {GraphQLError} from 'graphql';

function signedToken({username, firstName, email}) {
    let token = jwt.sign({
        username,
        firstName,
        email
    }, process.env.SECRET_HASH)
    return token
}

const user = {
    Mutation : {
        async register(parent, args, contextValue, info) {
            let {firstName, lastName, email, username, password} = args.registerInput
            // Hash password
            password = await bcrypt.hash(password , 10)
            const userObject = new userModel({firstName, lastName, email, username, password, createdAt: new Date().toISOString()})
            // Check if username exisits in database
            let response, token;
                let findUser = await userModel.find({'username': username})
                if(findUser.length !== 0) {
                    throw new GraphQLError('Username already exists in database.', {
                        extensions: {code: 'BAD_USER_INPUT'}
                    })
                }  
                response = await userObject.save()
                // Generate token on successful registration
                token = signedToken({
                    username: response.username,
                    firstName: response.firstName,
                    email: response.email
                })
            return {
                username: response.username,
                email: response.email,
                token,
                id: response.id
            }
        },
        async login(parent, args, contextValue, info) {
            const {username, password} = args
            // Find password of username entered in input field
            let findUsername = await userModel.find({'username': username})
            if(findUsername.length == 0) {
                throw new GraphQLError('Username not Valid. Please check username', {
                    extensions:{code:'BAD_USER_INPUT'}
                })
            }
            let searchResult = findUsername[0]
            // Match hashed password
            const validatePassword = await bcrypt.compare(password, searchResult['password'])
            if(validatePassword)
            {
                const token = signedToken({
                    username: searchResult['username'],
                    password: searchResult['password'],
                    email: searchResult['email']
                })
                return {
                    id: searchResult['id'],
                    username: searchResult['username'],
                    email:searchResult['email'],
                    token: token
                }
            }
            else
            {
                throw new GraphQLError('Credentials not correct. Please try again', {
                    extensions: {code: 'BAD_USER_INPUT'}
                })
            }
        }
    }
}

export default user;