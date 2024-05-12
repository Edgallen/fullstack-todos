import {FC, Suspense} from "react";

import InputForm from "./components/InputForm/InputForm";
import StatusSelector from "./components/StatusSelector/StatusSelector";
import TodoList from "./components/TodoList/TodoList";

import {getTodos} from "@/api/todos/actions";

import {statusesMap} from "@/pages/RootPage/constants";

interface IProps {
    searchParams?: {
        status?: string
    }
}

const RootPage: FC<IProps> = async ({ searchParams }) => {
    const selectedStatus = searchParams?.status || statusesMap.ALL

    const statusToFetchBy = selectedStatus === statusesMap.ALL
        ? null
        : selectedStatus

    const todosResponse = await getTodos(statusToFetchBy);

    return (
        <div className="flex flex-col w-[600px]">
            <InputForm />

            <StatusSelector />

            <Suspense
                fallback={
                    <span className="flex items-center justify-center w-full h-12 text-gray-900">
                        Loading...
                    </span>
                }
            >
                <TodoList
                    todos={todosResponse?.data || []}
                />
            </Suspense>
        </div>
    );
};

export default RootPage;
