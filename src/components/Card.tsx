import { ItunesResponseInterface } from "@/interfaces/ItunesResponseInterface";
import { SongInterface } from "@/interfaces/SongInterface";
import { api } from "@/utils/api";

interface Props extends SongInterface {
    test?: string
}

export default function Card(props: Props) {
    const searchMusicApi = api.music.search.useQuery({ searchTerm: `${props.song} ${props.artist}` }, {
        refetchOnWindowFocus: false
    });

    const item = searchMusicApi.data?.tracks.items[0]

    return (
        <div className="flex border p-3 w-full rounded-xl items-center gap-3">
            <div className="">
                <img className="w-[4rem] rounded-xl" src={item?.album.images[0]?.url} alt="" />
            </div>
            <div className="flex flex-col flex-1 truncate">
                <div className="truncate">{props.song}</div>
                <div className="text-base">{props.artist}</div>
            </div>
        </div>
    )
}