import { useState } from 'react';
import { userService } from '../services/userService';

export const useUser = () => {
    const [userName, setUserNameState] = useState<string>(() => userService.getCurrentUser().name);
    
    const setUserName = (name: string) => {
        const updatedUser = userService.updateUserName(name);
        setUserNameState(updatedUser.name)
    };

    return{
        userName,
        setUserName
    }
}
