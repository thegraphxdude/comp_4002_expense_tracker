import { userRepository } from "../repositories/userRepository";
import type { User} from "../repositories/userRepository";

export const userService = {
    getCurrentUser(): User {
        return userRepository.getUser();
    },

    updateUserName(name: string): User {
        const user: User = {name: name.trim()};
        userRepository.saveUser(user);
        return user;
    }
}