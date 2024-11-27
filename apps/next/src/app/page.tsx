import { FC } from "react";

import { MainLayout } from "@/components/Layouts";
import RootPage from "@/pages/RootPage/RootPage";

interface IProps {
    searchParams?: {
        status?: string
    }
}

const Home: FC<IProps> = ({ searchParams }) => (
    <MainLayout>
        <RootPage
            searchParams={searchParams}
        />
    </MainLayout>
);

export default Home;

