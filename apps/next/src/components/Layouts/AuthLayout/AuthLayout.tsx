import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => (
    <main className="bg-white flex items-center justify-center size-full h-dvh">
        {children}
    </main>
);

export default AuthLayout;
