'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { signMessage, toObject } from "../helpers"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useSelector } from "react-redux"
import { RootState } from "../stores/wallets"
import { toHex } from "ethereum-cryptography/utils"
import { secp256k1 } from "ethereum-cryptography/secp256k1"
import { keccak256 } from "ethereum-cryptography/keccak"
import { sha256 } from "ethereum-cryptography/sha256"

export type SigType=ReturnType<typeof secp256k1.sign>;

  async function SignAndSend(messageHash:string,privatekey:any,sender:any,reciever:string,amount:number){
    
    try{
      if(privatekey){
        const signedMessage=await signMessage(messageHash,privatekey)
        let recoveredKey=signedMessage.recoverPublicKey(messageHash).toRawBytes()
        console.log(recoveredKey)
        const JSONStringMessage=toObject(signedMessage)
       
        const transaction=await fetch('/api',{method:"PUT",cache:"no-cache",body:JSON.stringify({JSONStringMessage,messageHash,recoveredKey,amount,sender,reciever})})
        // console.log(await transaction.json())
      }
    }catch(e){
      console.log(e)
    }
  }
  
  export function AlertDialogDemo({open,setOpen,messageHash,address,amount}:{open:boolean,setOpen:any,messageHash:string,address:string,amount:number}) {
    const [privatekey,setPrivateKey]=useState<any>(null)
    const sender=(Object.keys(useSelector((state:RootState)=>state.wallet.account)))[0]
    return (
      <AlertDialog open={open} onOpenChange={setOpen} >
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              please insert your privatekey to sign the message
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input type="password" onChange={(e)=>setPrivateKey(e.target.value)} />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className=" px-5" onClick={()=>{SignAndSend(messageHash,privatekey,sender,address,amount)}} disabled={!privatekey} >Sign</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  