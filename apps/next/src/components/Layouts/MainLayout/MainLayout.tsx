import { FC, PropsWithChildren } from "react";

import Header from "@/components/Header/Header";

import { getSessionUserData } from "@/api/user/actions";

const MainLayout: FC<PropsWithChildren> = async ({ children }) => {
    const userData = await getSessionUserData()
        .then((userData) => {
            return userData;
        });

    return (
        <main className="bg-white flex flex-col pb-8 gap-8 items-center size-full min-h-dvh">
            <Header
                username={userData.username}
            />

            {children}
        </main>
    );
};

export default MainLayout;
