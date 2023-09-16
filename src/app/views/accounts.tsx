'use client'
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import AddNew from "../addnew";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState, updateaccount, updatewallet } from "../stores/wallets"
import { useEffect } from 'react';


export default function Accounts(){
    const dispatch=useDispatch()
    const wallet=useSelector((state:RootState)=>state.wallet.wallet)
    const account=useSelector((state:RootState)=>state.wallet.account)
    const fetchwallets=async()=>{
        const {ledger}=await(await fetch('/api',{method:"GET",cache:"no-cache"})).json()
        dispatch(updatewallet(ledger))
    }
    useEffect(()=>{
        fetchwallets()
    },[])

    function updateAccount(e:string){
        let obj={};
        obj[e]=wallet[e]
        dispatch(updateaccount(obj))
    }
   
    return(
        <div className="h-full w-[420px] flex flex-col justify-evenly rounded-sm px-4 border-2 border-solid border-black/40 shadow-lg shadow-blue-400">
            <div className=" flex justify-between">
            Accounts
            <AddNew/>
            </div>
            <Select disabled={!wallet} onValueChange={updateAccount} >
                <SelectTrigger disabled={!wallet}>
                    <SelectValue placeholder="accounts" />
                </SelectTrigger>
                <SelectContent>
                    {wallet&&Object.keys(wallet).map((k)=>(
                        <SelectItem key={k} value={k}>{k}</SelectItem>
                    ))}
                </SelectContent>
         </Select>
            {account&&<Label>{(account[Object.keys(account)[0]])}</Label>}
            {!account&&<Label>0</Label>}
        </div>
    )
}