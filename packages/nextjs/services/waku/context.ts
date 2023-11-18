import { LIKES_TOPIC, ROOT_TOPIC } from "./constants";
import { Like } from "./proto/like";
import { Root } from "./proto/root";
import { EncoderDecoder, getEncoderAndDecoder } from "./utils";
import { Unsubscribe, createLightNode, waitForRemotePeer } from "@waku/sdk";

export interface WakuContext {
    rootEncoderDecoder: EncoderDecoder;
    likeEncoderDecoder: EncoderDecoder;
    unsubscribeFromRoot: Unsubscribe;
    unsubscribeFromLike: Unsubscribe;
}

export interface WakuContextParams {
    onRootReceived: any;
    onLikeReceived: any;
}

export async function initWakuContext({ onRootReceived, onLikeReceived }: WakuContextParams): Promise<WakuContext> {
    /**
     * Decoders
     */
    const rootEncoderDecoder = getEncoderAndDecoder(ROOT_TOPIC);
    const likeEncoderDecoder = getEncoderAndDecoder(LIKES_TOPIC);

    /**
     * Node setup
     * TODO: connect to remote Waku network
     */
    const node = await createLightNode({ defaultBootstrap: true });

    await node.start();
    await waitForRemotePeer(node);

    /**
     * Subscribers
     */
    const unsubscribeFromRoot = await node.filter.subscribe([rootEncoderDecoder.decoder], wakuMessage => {
        const messageObj = Root.decode(wakuMessage.payload);
        onRootReceived({
            ...messageObj,
        });
    });

    const unsubscribeFromLike = await node.filter.subscribe([likeEncoderDecoder.decoder], wakuMessage => {
        const messageObj = Like.decode(wakuMessage.payload);
        onLikeReceived({
            ...messageObj,
        });
    });

    return {
        rootEncoderDecoder,
        likeEncoderDecoder,
        unsubscribeFromRoot,
        unsubscribeFromLike,
    };
}
