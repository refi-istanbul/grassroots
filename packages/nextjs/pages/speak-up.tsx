import { useEffect, useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { SpeakUpForm } from "~~/components/speak-up/speak.up.form";
import { WakuContext, initWakuContext } from "~~/services/waku/context";
import {createLike, createRoot} from "~~/services/waku/interactions";
import { notification } from "~~/utils/scaffold-eth";
import {useSignMessage} from "wagmi";

const PLACEHOLDER_IMAGE =
  "https://i.ibb.co/Zgk3484/speakup.jpg";

const SpeakUp: NextPage = () => {
  const [wakuGlobalContext, setWakuGlobalContext] = useState<WakuContext>();
  const {data: message, signMessage} = useSignMessage();

  const [speakUpSubmitData, setSpeakUpSubmitData] = useState();

  const [sideImageURL, setImageURL] = useState<string>(PLACEHOLDER_IMAGE);

  const submit = async (speakUpFormData: any) => {
    console.log("SpeakUpFormData", speakUpFormData);

    if(!speakUpFormData.title || !speakUpFormData.description || !speakUpFormData.location || !speakUpFormData.imageURL){
      notification.info("Please fill all the required fields");
      return;
    }

    setSpeakUpSubmitData(speakUpFormData);
    signMessage({message: speakUpFormData.title});
  };

  const updateImageURL = async (imageURLUpdated: string) => {
    imageURLUpdated.length > 0 ? setImageURL(imageURLUpdated) : setImageURL(PLACEHOLDER_IMAGE);
  };

  useEffect(() => {
    (async () => {
      const wakuGlobalContext: WakuContext = await initWakuContext({});
      setWakuGlobalContext(wakuGlobalContext);
      console.info("Speak up page waku instance instantiated !");
    })();
  }, []);


  //
  useEffect(() => {
    if (!message || !speakUpSubmitData) return;
    (async () => {
      await createRoot(wakuGlobalContext!.node, wakuGlobalContext!.rootEncoderDecoder.encoder, speakUpSubmitData);
      notification.success("Recorded!");
    })()
  }, [message]);
  //


  return (
    <>
      <div className="grid grid-cols-2 p-10 ml-5">
        <div className="flex py-8">
          <SpeakUpForm onSubmit={submit} onImageURLChange={updateImageURL} />
        </div>
        <div className="flex py-4">
          <div className="w-full flex flex-row items-center justify-center">
            <Image src={sideImageURL} width={400} height={250} alt="image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpeakUp;
