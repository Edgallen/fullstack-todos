import { json } from "@sveltejs/kit";

import { statusesMap } from "$pages/RootPage/constants";

import UserService from "$services/userService";

import { getTodos } from "@database/data-access";

import type db from "@database/prisma";

export const GET = async ({ url, cookies }) => {
    const status = url.searchParams.get("status");
    const user = await UserService.getUserFromSessionToken(cookies);

    const userId = user?.id as number;
    const isStatusValid = Object.keys(statusesMap).includes(status || "");
    const statusToQueryBy = status === statusesMap.ALL || !isStatusValid
        ? null
        : status as db.Status;

    try {
        const todos = await getTodos(userId, statusToQueryBy);

        return json(todos);
    } catch (error) {
        console.log(error);
    }
};
