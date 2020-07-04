const { NoEmitOnErrorsPlugin } = require("webpack");

const validator = require('validator');
const ValidationException = require('../exceptions/ValidationException');
const User = require('../models/User');
const UserModel = require('../models/UserModel');

class UserService {
    constructor(){        
    }

    async register(userRequest) {
        this.cleanUp(userRequest);
        const user = this.validateUserRequest(userRequest);    
        if(this.isEmailAlreadyRegistered(user.email)) {
            throw new ValidationException([`${user.email} is already registered.`]);
        }    
        const dbUser = await UserModel.create(user);
        return dbUser;
    }

    cleanUp(userRequest) {
        for(const key in userRequest) {
            if( typeof userRequest[key] !== 'string') {
                userRequest[key] = '';
            }
        }
    }

    validateUserRequest(userRequest) {
        const validationErrors = [];
        if(!userRequest.name || userRequest.name.trim().length < 10 || userRequest.name.trim().length > 50) {
            validationErrors.push('Name must be valid with size between 10 and 50.');
        }
        if(!validator.isEmail(userRequest.email.trim())) {
            validationErrors.push(`${userRequest.email} is invalid email`);
        }
        if(!userRequest.password || userRequest.password.trim().length < 6 || userRequest.password.trim().length > 12) {
            validationErrors.push('Password must be valid with size between 6 and 12.');
        }
        if(userRequest.password.trim().localeCompare(userRequest.confirmPassword.trim()) != 0) {
            validationErrors.push('Passwords does not match');
        }
        if(validationErrors.length > 0) {
            throw new ValidationException(validationErrors);
        }
        return new User(null, userRequest.name, userRequest.email, userRequest.password);
    }

    isEmailAlreadyRegistered(email) {

    }
}

module.exports = UserService;