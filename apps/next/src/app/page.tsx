import { FC } from "react";

import { MainLayout } from "@/components/Layouts";
import RootPage from "@/pages/RootPage/RootPage";

interface IProps {
    searchParams?: Promise<{
        status?: string
    }>
}

const Home: FC<IProps> = async props => {
    const searchParams = await props.searchParams;

    return (
        <MainLayout>
            <RootPage
                searchParams={searchParams}
            />
        </MainLayout>
    );
};

export default Home;

