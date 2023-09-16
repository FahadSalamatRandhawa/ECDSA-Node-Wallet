'use client'
import { useState } from "react";
import Accounts from "./accounts";
import Transfer from "./transfer";

export default function Wallet(){
   
    return(
        <div className="h-[500px] md:h-[250px] flex flex-col md:flex-row justify-around gap-5 md:gap-0 px-2 md:px-0">
            <Accounts />     
            <Transfer /> 
        </div>
    )
}