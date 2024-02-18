import { getToken } from "@/utils/Spotify";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    // const token = await getToken()
    // console.log(token);
    
    res.status(200).json({ name: "John Doe" });
}