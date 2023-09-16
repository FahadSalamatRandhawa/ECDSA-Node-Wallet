'use client'
import { useState } from "react";
import Accounts from "./accounts";
import Transfer from "./transfer";

export default function Wallet(){
   
    return(
        <div className=" h-[250px] flex justify-around">
            <Accounts />     
            <Transfer /> 
        </div>
    )
}