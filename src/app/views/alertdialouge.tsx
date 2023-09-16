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
import { useDispatch, useSelector } from "react-redux"
import { RootState, updatewallet } from "../stores/wallets"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

 
  
export function AlertDialogDemo({open,setOpen,messageHash,address,amount}:{open:boolean,setOpen:any,messageHash:string,address:string,amount:number}) {
    
    const [privatekey,setPrivateKey]=useState<any>(null)
    const sender=(Object.keys(useSelector((state:RootState)=>state.wallet.account)))[0]
    const dispatch=useDispatch();
    const { toast } = useToast()

    async function SignAndSend(messageHash:string,privatekey:any,sender:any,reciever:string,amount:number){
    
      try{
        if(privatekey){
          const signedMessage=await signMessage(messageHash,privatekey)
          let recoveredKey=signedMessage.recoverPublicKey(messageHash).toRawBytes()
          console.log(recoveredKey)
          const JSONStringMessage=toObject(signedMessage)
         
          const transaction=await fetch('/api',{method:"PUT",cache:"no-cache",body:JSON.stringify({JSONStringMessage,messageHash,recoveredKey,amount,sender,reciever})})
          if(transaction.ok){
            const {ledger}=await transaction.json()
              console.log('After transfer')
              dispatch(updatewallet(ledger))

              toast({
                title: "Transaction successful",
                description: `${amount} transfered to ${reciever}`,
              })
          }else{
            toast({
              variant: "destructive",
              title: "You messed with something",
              description: "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
          }
        }
      }catch(e){
        console.log(e)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }

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
  