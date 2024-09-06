"use server"
import TitleTopper from "@repo/ui/titletopper";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export default async function () {
    const session = await getServerSession(authOptions);
    const balance = await getBalance();

    return <div className="h-screen w-full">
        <div className="m-5 flex ">
            <div className="mr-36">
                <TitleTopper title={`Hi, ${session.user.name}`} />
                <TitleTopper title="Welcome to WalletPe"/>
                
                <div className=" bg-white h-fit w-fit px-5 pt-4 mt-10 mx-6 border-2 shadow-sm rounded-xl">
                    <p className="text-2xl font-sans tracking-wide text-gray-800 font-semibold">Current Wallet Balance</p>
                    <TitleTopper title={`₹ ${balance.amount / 100}`} />
                </div>
            </div>
            <img className="mt-3 w-[600px] h-[600px] rounded-2xl" src="https://i.postimg.cc/MpxKbX03/DALL-E-2024-09-06-20-46-45-A-sleek-modern-digital-wallet-app-banner-for-Wallet-Pe-with-a-purple-th.webp" />
        </div>
            
    </div>
}