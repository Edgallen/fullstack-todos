import {json} from "@sveltejs/kit";
import {Status} from "@prisma/client";

import {statusesMap} from "$pages/RootPage/constants";

import UserService from "$services/userService";

import {getTodos} from "$dataAccess/todos";

export const GET = async ({ url, cookies }) => {
    const status = url.searchParams.get('status');
    const user = await UserService.getUserFromSessionToken(cookies)

    const userId = user?.id as number
    const isStatusValid = Object.keys(statusesMap).includes(status || '');
    const statusToQueryBy = status === statusesMap.ALL || !isStatusValid
        ? null
        : status as Status

    try {
        const todos = await getTodos(userId, statusToQueryBy)

        return json(todos)
    } catch (error) {
        console.log(error)
    }
}
