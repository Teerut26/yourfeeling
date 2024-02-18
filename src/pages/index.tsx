import Card from "@/components/Card";
import { api } from "@/utils/api";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, ReactEventHandler, useState } from "react";

export default function Home() {
    const [Feeling, setFeeling] = useState<string>("");
    const geminiApi = api.music.getMusic.useMutation();

    const onSubmit = () => {
        if (Feeling.length <= 0) return
        geminiApi.mutate({
            feeling: Feeling,
            type: "EN"
        }, {
        }
        )
    }

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > 50) {
            return
        }
        setFeeling(e.target.value);
    }

    return (
        <div className="min-h-screen flex justify-center items-center py-5">
            {
                geminiApi.data ? <div className="flex flex-col gap-3 w-full  max-w-lg px-3">
                    <button onClick={() => {
                        geminiApi.reset()
                        setFeeling("");
                    }} className="flex border w-fit px-3 py-1 items-center gap-2 rounded-xl">
                        <MoveLeftIcon />
                        <div>Back</div>
                    </button>
                    <div>Your feeling : {Feeling}</div>
                    <div className="flex flex-col gap-2 w-full">
                        {geminiApi.data.map((song, index) =>
                            <Card key={index} {...song} />
                        )}
                    </div>
                    <div></div>
                </div> : <div className="flex flex-col gap-3 px-5 w-full  max-w-lg">
                    <div className="text-xl">บอกความรู้สึกของคุณกับเราหน่อยได้ไหม</div>
                    <div>
                        {/* <textarea className="rounded-2xl bg-white/30 p-5 w-full focus:outline-none"></textarea> */}
                        <textarea disabled={geminiApi.isLoading} value={Feeling} onChange={onChange} className="textarea w-full bg-white/30 text-stone-100 text-xl placeholder:text-stone-100/50 rounded-2xl" placeholder="ความรู้สึกคุณตอนนี้"></textarea>
                        <div className="flex justify-end text-sm">
                            {Feeling?.length}/50
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button disabled={geminiApi.isLoading} onClick={onSubmit} className="text-base w-full px-3 py-2 border rounded-xl hover:bg-white/20">ตามหาเพลง</button>
                        {/* <label className="swap btn text-base whitespace-nowrap">
                            <input type="checkbox" />
                            <div className="swap-on">ไทย</div>
                            <div className="swap-off">ต่างประเทศ</div>
                        </label> */}
                    </div>
                </div>
            }

        </div>
    );
}

