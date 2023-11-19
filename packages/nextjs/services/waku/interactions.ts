import { RootType } from "./constants";
import { Like } from "./proto/like";
import { Root } from "./proto/root";
import { LightNode } from "@waku/interfaces";
import { Encoder } from "@waku/sdk";

export interface CreateRootParams {
  type: RootType;
  title: string;
  description: string;
  location: string;
  tag: string;
  imageURL: string;
  relatedPosts: string;
}

export interface CreateLikeParams {
  isLike: boolean;
  rootId: string;
  userSignature: string;
}

export async function createRoot(node: LightNode, encoder: Encoder, params: CreateRootParams) {
  const newRoot = {
    id: window.crypto.randomUUID(),
    timestamp: BigInt(Date.now()),
    ...params,
  } as Partial<Root>;

  await node.lightPush.send(encoder, {
    payload: Root.encode(newRoot),
  });

  console.log("Sent now!!!!!!!!!!!!!!!!!!!!!");
}

export async function createLike(node: LightNode, encoder: Encoder, params: CreateLikeParams) {
  const newLike = {
    timestamp: BigInt(Date.now()),
    ...params,
  } as Partial<Like>;

  // TODO: Remove after testing is done
  console.log("New like:", newLike);

  await node.lightPush.send(encoder, {
    payload: Like.encode(newLike),
  });
}
