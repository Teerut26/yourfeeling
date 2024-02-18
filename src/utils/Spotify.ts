import { env } from "@/env.mjs";
import axios from "axios";
import qs from "qs";

export interface TokenResponseInterface {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getToken = async () => {
  const body = qs.stringify({
    client_id: env.SPOTIFY_CLIENT_ID,
    client_secret: env.SPOTIFY_CLIENT_SECRET,
    grant_type: "client_credentials",
  });
  const { data } = await axios<TokenResponseInterface>({
    method: "post",
    maxBodyLength: Infinity,
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: body,
  });

  return data;
};
