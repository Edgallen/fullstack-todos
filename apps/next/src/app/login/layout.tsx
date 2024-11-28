import React, { FC, PropsWithChildren } from "react";

import { AuthLayout } from "@/components/Layouts";

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <AuthLayout>
        {children}
    </AuthLayout>
);

export default Layout;
