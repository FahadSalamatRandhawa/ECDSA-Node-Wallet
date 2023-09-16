'use client'
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import {toHex} from 'ethereum-cryptography/utils'
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { updatewallet } from "./stores/wallets";
import { publicKeyToAddress } from "./helpers";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast";


export default function AddNew(){
    const dispatch=useDispatch()
    const [privateKey,setPrivateKey]=useState<string>()
    const [publicKey,setPublicKey]=useState<string>()
    const [initialBalance,setinitialBalance]=useState(0);
    const { toast } = useToast()

    async function generateKeyPairs(){
        const randomPrivatekey=toHex((secp256k1.utils.randomPrivateKey()));
        //console.log(randomPrivatekey,'random privatekey')
        setPrivateKey(randomPrivatekey)
        const publicKey=secp256k1.getPublicKey(randomPrivatekey)
        console.log(publicKey)
        const publicAddress=publicKeyToAddress(publicKey)
        //console.log(publicAddress,'public key afterslicing')
        setPublicKey(publicAddress)
        const transaction={publicAddress,initialBalance}
        console.log(transaction,'transact obj')
        const res=await fetch('/api',{method:"POST", cache:"no-cache",body:JSON.stringify(transaction)})
    }

    async function pushtoledger() {
        try{
          await generateKeyPairs()
        
          const {ledger}=await (await fetch('/api',{method:"GET",cache:"no-cache"})).json()
          console.log(ledger)
          dispatch(updatewallet(ledger))
          toast({
            title: "New keys generated",
            description: "please save your private key, it will only be showed this once",
          })

        }catch(e){
          console.log('ERROR in generatign new keys')
          console.log(e)
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }
    }

    return(
        <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add new wallet</Button>
        </DialogTrigger>
        <DialogContent className="sm:min-w-[425px] max-w-max">
          <DialogHeader>
            <DialogTitle>New Account</DialogTitle>
            <DialogDescription>
              specify your initial balance and we will create a new account for you
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Initial Balance
              </Label>
              <Input id="initialBalance" type="number" value={initialBalance} onChange={(e)=>{setinitialBalance(parseFloat(e.target.value))}} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={pushtoledger}>New Wallet</Button>
          </DialogFooter>
          {privateKey&&<div className=" select-all ...">{privateKey}</div>}
        </DialogContent>
      </Dialog>
    )
}