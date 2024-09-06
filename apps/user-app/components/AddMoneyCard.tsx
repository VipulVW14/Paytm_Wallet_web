"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
// import { Select } from "@repo/ui/select";
import Select  from "react-select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";
import { redirect } from "next/dist/server/api-utils";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}, {
    name: "ICICI Bank"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState("");

    return <Card title="Add Money">
    <div className="w-full">
        <div className="pt-2">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                setAmount(Number(value));
            }} />
        </div>
        <div className="pt-5 pb-1 text-left">
            Bank
        </div>
        <Select
            id="bank_name"
            options={SUPPORTED_BANKS.map(x => ({
                label: x.name,
                value: x.name
            }))} 
            onChange={(selectedOption) => {
                const selectedValue = selectedOption?.value || "";  // Access value from the selected option object
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === selectedValue)?.redirectUrl || "")
                setProvider(SUPPORTED_BANKS.find(x => x.name === selectedValue)?.name || "")
            }}
            placeholder="Select Bank..."
            isSearchable
        />
  
        <div className="flex justify-center pt-6">
            <Button onClick={async () => {
                await createOnRampTransaction(amount * 100, provider);
                window.location.href = redirectUrl || "";
            }}>
                Add Money
            </Button>
        </div>
    </div>
</Card>
}