import { NextRequest, NextResponse } from "next/server";

let ledger: Record<string, number> = {
  default1: 5,
};
export async function GET(reques: NextRequest) {
  return NextResponse.json({ ledger, success: "true" });
}

export async function POST(request: NextRequest) {
  try {
    const transaction = await request.json();
    console.log(transaction, "in API");
    ledger[transaction.publicAddress] = transaction.initialBalance;
  } catch (e) {
    return new NextResponse(JSON.stringify({ success: "fail" }), {
      status: 400,
    });
  }

  return NextResponse.json({ ledger, success: "true" });
}
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { publicKeyToAddress } from "../helpers";

export async function PUT(request: NextRequest) {
  try {
    const {
      messageHash,
      JSONStringMessage,
      recoveredKey,
      amount,
      sender,
      reciever,
    } = await request.json();
    // console.log(
    //   messageHash,
    //   JSONStringMessage,
    //   recoveredKey,
    //   amount,
    //   sender,
    //   reciever
    // );
    const stringToJSONSignature = {
      r: BigInt(JSONStringMessage.r),
      s: BigInt(JSONStringMessage.s),
      recovery: JSONStringMessage.recovery,
    };
    //console.log(recoveredKey);
    const keyArray = new Uint8Array(Object.values(recoveredKey));
    //console.log(keyArray);
    const recoveredAddress = publicKeyToAddress(keyArray);
    //console.log("AFTER RECOVERED ADDRESS");
    const verified = secp256k1.verify(
      stringToJSONSignature,
      messageHash,
      keyArray
    );
    //console.log("AFTER VERIFY");
    console.log(amount);
    if (verified && recoveredAddress == sender) {
      console.log("INSIDE VERIFIED");
      ledger[sender] = ledger[sender] - amount;
      if (ledger[reciever]) {
        ledger[reciever] = ledger[reciever] + amount;
      } else {
        ledger[reciever] = amount;
      }
      console.log(ledger[reciever]);
      return NextResponse.json({ success: "true", ledger });
    }
    console.log("VerifyFailed");
    console.log(sender, recoveredAddress);
    return new NextResponse(
      JSON.stringify({
        message: "verify failed or sender address it tempered with",
        success: "fail",
      }),
      {
        status: 400,
      }
    );
  } catch (e) {
    console.log(e);
    return new NextResponse(JSON.stringify({ message: e, success: "fail" }), {
      status: 400,
    });
  }
}
