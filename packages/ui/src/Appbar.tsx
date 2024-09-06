import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 border-slate-300">
        <div className="text-2xl text-purple-900 font-bold flex flex-col justify-center">
            WalletPe
        </div>
        <div className="flex justify-center pt-2">
            <p className="text-2xl p-2 font-mono mr-2">{user?.name}</p>
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}