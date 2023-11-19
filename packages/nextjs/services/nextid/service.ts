const baseURL = "https://proof-service.next.id/v1";

export const fetchUser = async (platform: string, identity: string) => {
  const res = await fetch(`${baseURL}/proof?platform=${platform}&identity=${identity}`, {
    method: "GET",
  });

  return (await res.json()).ids;
};

export const createUser = async (identity: string, publicKey: string) => {
  const req = {
    action: "create",
    platform: "twitter",
    identity,
    public_key: publicKey,
  };

  const res = await fetch(`${baseURL}/proof/payload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(req),
  });

  console.log(res);

  return await res.json();
};

export const completeSignin = async (
  publicKey: string,
  identity: string,
  tweetProof: string,
  uuid: string,
  createdAt: number,
  signature: string,
) => {
  const req = {
    action: "create",
    platform: "twitter",
    identity,
    public_key: publicKey,
    proof_location: String(tweetProof), // The link of Proof
    extra: { signature },
    uuid: uuid,
    created_at: String(createdAt),
  };

  console.log("Complete signing payload");
  console.log(req);

  const res = await fetch(`${baseURL}/proof`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(req),
  });

  console.log(res);
};
