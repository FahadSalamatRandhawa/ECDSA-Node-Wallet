'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stores/wallets";
import { keccak256, keccak224, keccak384, keccak512 } from "ethereum-cryptography/keccak.js";
import { AlertDialogDemo } from "./alertdialouge";
import { toHex } from "ethereum-cryptography/utils";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form"

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  balance:z.number().gte(1,{message:'increase value'})
})

export default function Transfer(){
    const account=useSelector((state:RootState)=>state.wallet.account)
    const accountBalance=account?account[Object.keys(account)[0]]:null
    const [balance,setBalance]=useState<number>(0)
    const [address,setAddress]=useState<any>()
    const [messageHash,setMessageHash]=useState<any>()
    const [open,setOpen]=useState(false)

    useEffect(()=>{
        const message=Buffer.from(`I want to give ${balance} to ${address}`)
        const messageHash=toHex(keccak256(message));
        setMessageHash(messageHash)
    },[address,balance])
    return(
        <div className=" h-full w-[420px] flex flex-col justify-evenly rounded-sm px-4 border-2 border-solid border-black/40 shadow-lg shadow-red-400">
                Transfer
                <Input onChange={(e)=>setAddress(e.target.value)} />
                <Input type="number" onChange={(e)=>{setBalance(parseFloat(e.target.value))}} />
                <Button variant='outline' onClick={()=>{setOpen(true)}} disabled={!account||!balance||(balance>accountBalance)||!address} >Transfer</Button>
            <AlertDialogDemo open={open} setOpen={setOpen} messageHash={messageHash} address={address} amount={balance} />
        </div>
    )
}

