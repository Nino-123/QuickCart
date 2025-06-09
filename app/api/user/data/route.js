import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/User";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        // Add this log:
        console.log("Requested userId:", userId);

        await connectDB();
        // FIX: Find by Clerk userId, not MongoDB _id
        const users = await User.find({});
        console.log("All users in DB:", users);
        
        const user = await User.findById( userId );

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        return NextResponse.json({ success: true, user });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}