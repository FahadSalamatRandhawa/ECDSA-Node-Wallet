import Wallet from "./views/wallet";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ECDSA Node Cryptography',
  description: 'A project for creating ECDSA entrcypted test wallets',
}


export default async function Home() {
  
  return (
    <div className=" h-screen block pt-20 bg-slate-100">
      <Wallet />
    </div>
  )
}
