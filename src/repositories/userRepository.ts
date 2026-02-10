export interface User {
    name: string
}

let currentUser: User = {name : "Guest"};

export const userRepository = {
    getUser(): User {
        return {...currentUser};
    },

    saveUser(user: User): void {
        currentUser = {...user}
    }
};