import React, { useState } from "react";
import Image from "next/image";
import { createUser, fetchUser } from "~~/services/nextid/service";
import { useGlobalState } from "~~/services/store/store";
import { notification } from "~~/utils/scaffold-eth";

export const NextIdSignin = () => {
  const [handle, setHandle] = useState("");
  const { userWallet } = useGlobalState();

  const onSignin = async () => {
    notification.info(
      <div className="flex flex-col gap-3 justify-center items-center">
        <div>{nextIdLogo("/nextid-dark.png", 30)}</div>
        <div>{`Verifying your identity...`}</div>
      </div>,
    );

    const fetchResponse = await fetchUser("ethereum", userWallet);
    if (!fetchResponse.length) {
      // TODO: https://github.com/DimensionDev/Maskbook/discussions/11090#discussioncomment-7494578
      const res = await createUser("twitter", handle, userWallet);
      console.log(res);
    }
  };

  const nextIdLogo = (url: string, size: number) => {
    return <Image src={url} width={size} height={size} alt="" />;
  };

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={onSignin}>
        {nextIdLogo("/nextid.svg", 25)}
        <span>Next.ID sign in</span>
      </button>
      <input
        hidden // TODO: Remove when you need it
        placeholder="Your Twitter handle..."
        type="string"
        value={handle}
        onChange={e => setHandle(e.target?.value)}
      />
    </>
  );
};
