const baseURL = "https://proof-service.next.id/v1";

export const fetchUser = async (platform: string, identity: string) => {
  const res = await fetch(`${baseURL}/proof?platform=${platform}&identity=${identity}`, {
    method: "GET",
  });

  return (await res.json()).ids;
};

export const createUser = async (platform: string, identity: string, publicKey: string) => {
  const req = {
    action: "create",
    platform,
    identity,
    publicKey,
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
