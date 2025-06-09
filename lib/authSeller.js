import { clerkClient } from '@clerk/nextjs/server';

const authSeller = async (userId) => {
    try {
        const user = await clerkClient.users.getUser(userId);

        // Check if publicMetadata and role exist
        if (user && user.publicMetadata && user.publicMetadata.role === 'seller') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // Log error for debugging
        console.error("authSeller error:", error.message);
        return false;
    }
}

export default authSeller;