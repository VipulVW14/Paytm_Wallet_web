"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-white bg-purple-700" : "hover:bg-purple-100 text-slate-500"} rounded-lg cursor-pointer mx-3 py-3 pl-4`} onClick={() => {
        router.push(href);
    }}>
        <div className="mr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-white" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}