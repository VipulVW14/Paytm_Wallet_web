import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import TitleTopper from "@repo/ui/titletopper";
import { P2pTransactions } from "../../../components/P2pTransactions";
import { useEffect } from "react";

async function getP2pTransfers() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        },
        include: {
            toUser: {
                select: {
                    number: true
                }
            }
        }
    });
    return txns.map((t) => ({
        time: t.timestamp,
        amount: t.amount,
        toUserId: t.toUserId,
        toUserNumber: t.toUser?.number 
    }));
}

export default async function (){
    const transactions = await getP2pTransfers();

    return <div className="w-screen">
            <div className="grid grid-cols-2 px-4 text-gray-800">
                <div>
                    < TitleTopper title="Transfer Money"/>
                    <SendCard/>
                </div>

                <div className="mt-5 mr-16">
                    <P2pTransactions transactions={transactions}/>
                </div>
            </div>
    </div>
}