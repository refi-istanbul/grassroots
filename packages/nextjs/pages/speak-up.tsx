import type { NextPage } from "next";
import {SpeakUpForm} from "~~/components/speak-up/speak.up.form";
import {useEffect, useState} from "react";
import {initWakuContext, WakuContext} from "~~/services/waku/context";
import {Root} from "~~/services/waku/proto/root";
import {createRoot} from "~~/services/waku/interactions";

const SpeakUp: NextPage = () => {

  const [wakuGlobalContext, setWakuGlobalContext] = useState<WakuContext>();

  const submit = async (speakUpFormData: any) => {
      console.log("SpeakUpFormData", speakUpFormData);
      await createRoot(wakuGlobalContext!.node, wakuGlobalContext!.rootEncoderDecoder.encoder, speakUpFormData);
  }

    useEffect(() => {
        (async () => {
            const wakuGlobalContext: WakuContext = await initWakuContext({
                onRootReceived: () => {},
                onLikeReceived: () => {},
            });
            setWakuGlobalContext(wakuGlobalContext);
            console.info("Speak up page waku instance instantiated !");
        })();
    }, []);

    useEffect(() => {

    }, [wakuGlobalContext]);

  return (
    <>
      <div className="grid grid-cols-2 p-10 ml-5">
        <div className="flex py-8">
          <SpeakUpForm onSubmit={submit} />
        </div>
          <div className="flex py-4">
              <h1>What's good</h1>
          </div>
      </div>
    </>
  );
};

export default SpeakUp;
