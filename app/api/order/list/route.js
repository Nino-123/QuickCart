import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import Address from "@/models/Address";



export async function GET(request) {
    try {
        
        const {userId} = getAuth(request)

        await connectDB()

        Address.length
        Product.length

        const orders = await order

    } catch (error) {
        
    }
}