'use server'

import UserService from "@/services/userService";

export const getSessionUserData = async () => {
    return await UserService.getUserFromSessionToken()
}
