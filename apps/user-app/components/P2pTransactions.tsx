import { Card } from "@repo/ui/card";
import prisma from "@repo/db/client";

export const P2pTransactions = ({ transactions }: {
    transactions: {
        time: Date,
        amount: number,
        toUserId: number,
        toUserNumber: string
    }[]
}) => {
    if(!transactions.length){
        return <Card title="Recent Transfers">
            <div className="text-center pb-8 pt-8">
                No recent transfers 
            </div>  
        </Card>
    }

    return <Card title="Recent Transfers">
        <div className="pt-2 relative overflow-auto"
        style={{ maxHeight: `calc(100vh - 180px)` }}>
            {transactions.slice().reverse().map(t => <div className="justify-items-center grid grid-cols-3 my-2 mx-1">
                <div className="justify-self-start">
                    <div className="text-sm">
                        To {t.toUserNumber}
                    </div>
                    <div className="text-slate-600 text-xs">
                        Paid on {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify col-start-3 justify-self-end mr-5">
                    - Rs. {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
};