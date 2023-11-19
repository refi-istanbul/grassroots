import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as EthCrypto from "eth-crypto";
// import { hashMessage, recoverPublicKey } from "ethers";
import { hashMessage, recoverPublicKey } from "viem";
import { useSignMessage } from "wagmi";
import { completeSignin, createUser, fetchUser } from "~~/services/nextid/service";
import { useGlobalState } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

export const NextIdSignin = () => {
  const [tweetID, setTweetID] = useState("");
  const [uuid, setUuid] = useState("");
  const [createdAt, setCreatedAt] = useState(0);
  const [recoveredPubKey, setRecoveredPubKey] = useState<string>("");
  const [signingMessage, setSigningMessage] = useState("");

  const { userWallet } = useGlobalState();

  const { data: signMessageDataFirst, signMessage: signMessageFirst } = useSignMessage();
  const { data: signMessageDataSecond, signMessage: signMessageSecond } = useSignMessage();

  const message = "Verify your Next.ID with Grassroots.";

  useEffect(() => {
    if (signMessageDataFirst) {
      console.log(signMessageDataFirst);

      const prefixedDigest = hashMessage(message);
      recoverPublicKey({ hash: prefixedDigest, signature: signMessageDataFirst }).then(recoveredPubKey => {
        const compressed = EthCrypto.publicKey.compress(recoveredPubKey.substring(2));
        console.log(compressed);
        console.log(recoveredPubKey);
        // setRecoveredPubKey(recoveredPubKey.substring(2));
        setRecoveredPubKey(compressed);

        // createUser(recoveredPubKey.substring(2)).then(res => {
        createUser(compressed).then(res => {
          console.log(res);
          setUuid(res.uuid);
          setCreatedAt(res.created_at);
          signMessageSecond({ message: res?.sign_payload as any });
          notification.remove(signingMessage);
          setSigningMessage("");
        });
      });
    }
  }, [signMessageDataFirst]);

  useEffect(() => {
    if (signMessageDataSecond) {
      console.log(signMessageDataSecond);
      const base64Signature = Buffer.from(signMessageDataSecond).toString("base64");
      console.log(base64Signature);
    }
  }, [signMessageDataSecond]);

  const nextIdLogo = (url: string, size: number) => {
    return <Image src={url} width={size} height={size} alt="" />;
  };

  const onInitiateSignin = async () => {
    const signingMessagePopupId = notification.loading(
      <div className="flex flex-col gap-3 justify-center items-center">
        <div>{nextIdLogo("/nextid-dark.png", 30)}</div>
        <div>{`Initiate identity verification...`}</div>
      </div>,
    );
    setSigningMessage(signingMessagePopupId);

    const fetchResponse = await fetchUser("ethereum", userWallet);
    if (!fetchResponse.length) {
      // TODO: https://github.com/DimensionDev/Maskbook/discussions/11090#discussioncomment-7494578
      signMessageFirst({ message });
    }
  };

  const onCompleteSignin = async () => {
    const completingPopup = notification.loading(
      <div className="flex flex-col gap-3 justify-center items-center">
        <div>{nextIdLogo("/nextid-dark.png", 30)}</div>
        <div>{`Completing identity verification...`}</div>
      </div>,
    );
    setSigningMessage(completingPopup);

    completeSignin(recoveredPubKey, tweetID, uuid, createdAt, signMessageDataSecond as string).then(res => {
      console.log(res);
      notification.remove(signingMessage);
      setSigningMessage("");
    });
  };

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={onInitiateSignin}>
        {nextIdLogo("/nextid.svg", 25)}
        <span>Initiate sign in</span>
      </button>
      <button className="btn btn-primary btn-sm" onClick={onCompleteSignin}>
        {nextIdLogo("/nextid.svg", 25)}
        <span>Complete sign in</span>
      </button>
      <input
        // hidden // TODO: Remove when you need it
        placeholder="Your Twitter handle..."
        type="string"
        value={tweetID}
        onChange={e => setTweetID(e.target?.value)}
      />
    </>
  );
};
