import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id:'synce-user-from-clerk'
    },
    { event: 'clerk/user.created'},
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, iamge_url } = event.data
        const userData = {
            _id:id,
            email: email_addresses[0].email_addresses,
            name: first_name + ' ' + last_name,
            imageUrl: iamge_url
        }
        await connectDB()
        await User.create(userData)
    }
)

//update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    { event: 'clerk/user.updated' },
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, iamge_url } = event.data
        const userData = {
            _id:id,
            email: email_addresses[0].email_addresses,
            name: first_name + ' ' + last_name,
            imageUrl: iamge_url
        }
        await connectDB()
        await User.findByIdAndUpdate (id,userData)
    }
)

//delete user in database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    { evernt: 'clerk/user.deleted' },
    async ({event}) => {
        const {id } = event.data

        await connectDB()
        await User.findByIdAndDelete(id)
    }
)