import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import authSeller from "@/lib/authSeller";
import { connect } from "mongoose";
import Address from "@/models/Address";



export async function GET(request) {
    try {
        
        const { userId } = getAuth(request);

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized" })
        }

        await connectDB()

        Address.length

        const addresses = await Order.find({}).populate('address items.product')

        return NextResponse.json({ success: true, orders });

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Authorized' })
    }

}