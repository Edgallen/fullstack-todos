import { FC, Suspense } from "react";

import InputForm from "./components/InputForm/InputForm";
import StatusSelector from "./components/StatusSelector/StatusSelector";
import TodoList from "./components/TodoList/TodoList";

interface IProps {
    searchParams: Promise<{
        status: string
    }>
}

const RootPage: FC<IProps> = async ({ searchParams }) => {
    const { status } = await searchParams;

    return (
        <div className="flex flex-col w-[600px]">
            <InputForm/>

            <StatusSelector/>

            <Suspense
                key={status}
                fallback={
                    <span className="flex items-center justify-center w-full h-12 text-gray-900">
                    Loading...
                </span>
                }
            >
                <TodoList
                    status={status}
                />
            </Suspense>
        </div>
    );
};

export default RootPage;
