import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { runGemini } from "@/utils/GoogleGemini";
import { SongInterface } from "@/interfaces/SongInterface";
import { SpotifySearchResultResponseInterface } from "@/interfaces/SpotifySearchResultResponseInterface";
import { env } from "@/env.mjs";
import { getToken } from "@/utils/Spotify";

export const musicRouter = createTRPCRouter({
  getMusic: publicProcedure
    .input(z.object({ feeling: z.string(), type: z.string() }))
    .mutation(async ({ input }) => {
      const result = await runGemini({
        prompt: input.feeling.slice(0, 50),
        musicType: Number(input.type === "TH" ? 1 : 0),
      });
      if (result.response.candidates) {
        return (
          (JSON.parse(
            result.response.candidates[0]?.content.parts[0]?.text ?? "",
          ) as SongInterface[]) ?? []
        );
      } else {
        return [];
      }
    }),
  search: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(async ({ input }) => {
      const token = await getToken();
      const { data } = await axios<SpotifySearchResultResponseInterface>({
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.spotify.com/v1/search?q=${input.searchTerm}&type=track&limit=1&market=TH`,
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      return data;
    }),
});
