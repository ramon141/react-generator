// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { authenticate, TokenService } from '@loopback/authentication';
import {
    MyUserService,
    TokenServiceBindings,
    UserServiceBindings,
} from '@loopback/authentication-jwt';
import { inject } from '@loopback/core';
import { model, property, repository, Model } from '@loopback/repository';
import {
    get,
    getModelSchemaRef,
    HttpErrors,
    post,
    requestBody,
    SchemaObject,
} from '@loopback/rest';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { genSalt, hash, compareSync } from 'bcryptjs';
import _ from 'lodash';
import { ModelName } from '../models';
import { ModelNameRepository } from '../repositories';

@model()
export class Credentials extends Model {
    @property({
        type: 'string',
        required: true,
    })
    credential_pair: string;

    @property({
        type: 'string',
        required: true,
    })
    password: string;
}

const CredentialsSchema: SchemaObject = {
    type: 'object',
    required: ['credential_pair', 'password'],
    properties: {
        credential_pair: {
            type: 'string',
            format: 'credential_pair_format',
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
};

export const CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: CredentialsSchema },
    },
};

export class ModelNameController {
    constructor(
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(UserServiceBindings.USER_SERVICE)
        public userService: MyUserService,
        @inject(SecurityBindings.USER, { optional: true })
        public user: UserProfile,
        @repository(UserRepository) protected userRepository: ModelNameRepository,
    ) { }

    @post('/users/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    async login(
        @requestBody(CredentialsRequestBody) credentials: Credentials,
    ): Promise<{ token: string }> {
        // ensure the user exists, and the password is correct
        const user = await this.userRepository.findOne({ where: { credential_pair: credentials.credential_pair } });

        if (!user || !compareSync(credentials.password, user.password))
            throw new HttpErrors[401]("User not found");

        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = {
            [securityId]: credentials.credential_pair
        };

        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }

    @authenticate('jwt')
    @get('/whoAmI', {
        responses: {
            '200': {
                description: 'Return current user',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    })
    async whoAmI(
        @inject(SecurityBindings.USER)
        currentUserProfile: UserProfile,
    ): Promise<string> {
        return currentUserProfile[securityId];
    }

    @post('/signup', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': ModelName,
                        },
                    },
                },
            },
        },
    })
    async signUp(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(ModelName, {
                        title: 'NewUser',
                        exclude: ['id'],
                    }),
                },
            },
        })
        newUserRequest: ModelName,
    ): Promise<ModelName> {
        const password = await hash(newUserRequest.password, await genSalt());
        newUserRequest.password = password;
        const user = await this.userRepository.create(newUserRequest);
        user.password = '';

        return user;
    }
}