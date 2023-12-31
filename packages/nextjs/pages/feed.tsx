import {useEffect, useState} from "react";
import type {NextPage} from "next";
import {RootComponent} from "~~/components/grassroots/RootComponent";
import {RootComponentHard} from "~~/components/grassroots/RootComponentHard";
import {RootComponentHard2} from "~~/components/grassroots/RootComponentHard2";
import {useGlobalState} from "~~/services/store/store";
import {WakuContext, initWakuContext} from "~~/services/waku/context";
import {createLike} from "~~/services/waku/interactions";
import {Like} from "~~/services/waku/proto/like";
import {Root} from "~~/services/waku/proto/root";
import {RootItem} from "~~/types/grassroots/root";
import {notification} from "~~/utils/scaffold-eth";
import {useSignMessage} from "wagmi";

const Feed: NextPage = () => {
    const [wakuGlobalContext, setWakuGlobalContext] = useState<WakuContext>();
    const [rootsList, setRoots] = useState<RootItem[]>([]);
    const {userWallet} = useGlobalState();

    const {data: message, signMessage} = useSignMessage();
    const {data: disLikeMessageSign, signMessage: signDislikeDisLikeMessageSign} = useSignMessage();
    const [rootIdForLikeSign, setRootIdForLikeSign] = useState<string>();

    async function onMessageReceived(message: Partial<RootItem>) {
        console.info("onMessageReceived", message);
        // TODO: Calculate the like for the roots by pulling the like topic messages

        // check if it's duplicate message
        const checkDuplicate = rootsList.filter(root => root.id === message.id);
        if (checkDuplicate[0]) {
            return await fetchLikeForATopic(checkDuplicate[0].id);
        }

        const {dislikes, likes} = await fetchLikeForATopic(message.id!);

        message.likes = likes;
        message.dislikes = dislikes;

        console.info("likes", likes, "dislikes", dislikes);

        setRoots(existingRootsList => [...existingRootsList, message as RootItem]);
    }

    function onLikeMessageReceived(message: any) {
        console.info("onLikeReceived", message);
    }

    async function fetchLikeForATopic(rootsTopicId: string): Promise<{ likes: number; dislikes: number }> {
        let totalLikes = 0;
        let totalDisLikes = 0;

        const likesOfPost: { [key: string]: Like[] } = {};

        await wakuGlobalContext!.node.store.queryWithOrderedCallback(
            [wakuGlobalContext!.likeEncoderDecoder.decoder],
            wakuMessage => {
                const wakuMessageDecoded = Like.decode(wakuMessage.payload);
                if (wakuMessageDecoded.rootId == rootsTopicId) {
                    if (likesOfPost[`${wakuMessageDecoded.userSignature}`]) {
                        likesOfPost[`${wakuMessageDecoded.userSignature}`].push(wakuMessageDecoded);
                    } else {
                        likesOfPost[`${wakuMessageDecoded.userSignature}`] = [wakuMessageDecoded];
                    }
                }
            },
        );

        Object.keys(likesOfPost).forEach(userIdentifier => {
            console.info("userIdentifier", userIdentifier, likesOfPost[userIdentifier]);
            likesOfPost[userIdentifier].sort((x, y) => {
                return Number(y.timestamp) - Number(x.timestamp);
            });

            likesOfPost[userIdentifier][0].isLike ? totalLikes++ : totalDisLikes++;
        });

        return {likes: totalLikes, dislikes: totalDisLikes};
    }




    // ------ for like ----- //
    function onLike(rootId: string) {
        if (!userWallet) {
            notification.error("Please sign in with your wallet.");
            return;
        }
        setRootIdForLikeSign(rootId);
        signMessage({message: rootId});
    }

    useEffect(() => {
        if (!rootIdForLikeSign || !message) return;
        (async () => {
            console.log("user iffect on sign message loaded");
            const rootLink = {
                isLike: true,
                rootId: rootIdForLikeSign,
                userSignature: `userWallet-${rootIdForLikeSign}`,
            };
            await createLike(wakuGlobalContext!.node, wakuGlobalContext!.likeEncoderDecoder.encoder, rootLink);
            notification.info("Done!");
            await updateLikeRecordOfNewsTopic(rootIdForLikeSign);
        })()
    }, [message]);
    // ---------------- //


    // ------ for dis like ----- //
    function onDisLike(rootId: string) {
        if (!userWallet) {
            notification.error("Please sign in with your wallet.");
            return;
        }
        setRootIdForLikeSign(rootId);
        signDislikeDisLikeMessageSign({message: rootId});
    }

    useEffect(() => {
        if (!rootIdForLikeSign || !disLikeMessageSign) return;
        (async () => {
            console.log("user effect on disLikeMessageSign");

            const rootLink = {
                isLike: false,
                rootId: rootIdForLikeSign,
                userSignature: `userWallet-${rootIdForLikeSign}`,
            };
            await createLike(wakuGlobalContext!.node, wakuGlobalContext!.likeEncoderDecoder.encoder, rootLink);
            notification.info("Done!");
            await updateLikeRecordOfNewsTopic(rootIdForLikeSign);
        })()
    }, [disLikeMessageSign]);
    // -------------------- //


    const updateLikeRecordOfNewsTopic = async (topicId: string) => {
        const recentStat = await fetchLikeForATopic(topicId);

        const newRootsList = rootsList.map(root => {
            if (root.id === topicId) {
                return {...root, likes: recentStat.likes, disLikes: recentStat.dislikes};
            }
            return root;
        });

        setRoots(newRootsList);
    };

    useEffect(() => {
        (async () => {
            const wakuGlobalContext: WakuContext = await initWakuContext({
                onRootReceived: onMessageReceived,
                onLikeReceived: onLikeMessageReceived,
            });
            setWakuGlobalContext(wakuGlobalContext);
            console.info("Waku global context instantiated!");
        })();
    }, []);

    useEffect(() => {
        if (!wakuGlobalContext) return;
        (async () => {
            console.info("use effect query callback");
            await wakuGlobalContext?.node.store.queryWithOrderedCallback(
                [wakuGlobalContext.rootEncoderDecoder.decoder],
                wakuMessage => {
                    const wakuMessageDecoded = Root.decode(wakuMessage.payload);
                    onMessageReceived(wakuMessageDecoded as unknown as Partial<RootItem>);
                },
            );
        })();
    }, [wakuGlobalContext]);

    console.log(rootsList);

    return (
        <>
            <div className="flex items-center flex-col flex-grow pt-10 gap-5">

            <RootComponentHard
                        />

            <RootComponentHard2
                        />
                        
                {rootsList.map(root => {
                    return (
                        <RootComponent
                            r={root}
                            key={`${root.id}-${root.timestamp}`}
                            onLike={() => onLike(root.id)}
                            onDisLike={() => onDisLike(root.id)}
                            onSpeakUp={() => notification.info("Speak up...")}
                        />
                    );
                })}
            </div>
        </>
    );
};

// test

export default Feed;
