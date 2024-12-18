import { FC } from "react";

import List from "./components/List/List";

import { getTodos } from "@/api/todos/actions";

import { statusesMap } from "@/pages/RootPage/constants";

interface IProps {
    status: string
}

const TodoList: FC<IProps> = async ({ status }) => {
    const selectedStatus = status || statusesMap.ALL;

    const statusToFetchBy = selectedStatus === statusesMap.ALL
        ? null
        : selectedStatus;

    const todosResponse = await getTodos(statusToFetchBy);

    return (
        <List
            todos={todosResponse?.data || []}
        />
    );
};

export default TodoList;
