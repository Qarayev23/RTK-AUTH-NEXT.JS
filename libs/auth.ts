import { jwtVerify } from "jose";

export async function verifyJwtToken(token) {
    try {
        const { payload } = await jwtVerify(token,
            new TextEncoder().encode(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY));
        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
}