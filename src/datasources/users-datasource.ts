import { GraphQLError } from "graphql";
import { Role, User } from "../generated/graphql.js";



function checkUserAuthentication() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){

        const originalValue = descriptor.value;
         descriptor.value = function(...args: any[]){

            //validate user
            if (!this.user || !this.user.roles.includes(adminRole)) {
                throw new GraphQLError('You need to be logged in to access', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                });
            }

            //return
            return originalValue.apply(this,args);
        }
    }
}


const adminRole:Role = {
    id: 'admin',
    name: 'administrador'
}

const UsersDB: Omit<Required<User>, "__typename">[]=[
    {
        id: '104269147388741962300',
        email: 'genarionogueira2@gmail.com',
        roles: [
            adminRole
        ]
    },
]

class UsersDataSource {
    user:User;
    constructor(user: User){
        this.user = user;
    }

    @checkUserAuthentication()
    async getAll(): Promise<User[]>{
        return UsersDB
    }
    async getById(id): Promise<User[]>{
        return UsersDB.filter(user=>{
            return user.id = id;
        })
    }
}

function getUser(id: string): User{
    const users: User[] = UsersDB.filter(user=>{
        return user.id = id
    });
    if (users && users.length > 0){
        return users[0];
    }
}

export {
    getUser, UsersDataSource
}

