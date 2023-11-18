import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { NewsItem } from "~~/components/news/NewsItem";
import { WakuContext, initWakuContext } from "~~/services/waku/context";
import { createLike } from "~~/services/waku/interactions";
import { Like } from "~~/services/waku/proto/like";
import { Root } from "~~/services/waku/proto/root";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  likes: number;
  dislikes: number;
};

const News: NextPage = () => {
  const [wakuGlobalContext, setWakuGlobalContext] = useState<WakuContext>();
  const [newsList, setNews] = useState<NewsItem[]>([]);

  async function onMessageReceived(message: Partial<NewsItem>) {
    console.info("onMessageReceived", message);
    // TODO: Calculate the like for the news by pulling the like topic messages

    const { dislikes, likes } = await fetchLikeForATopic(message.id!);

    message.likes = likes;
    message.dislikes = dislikes;

    console.info("likes", likes, "dislikes", dislikes);

    setNews(existingNewsList => [...existingNewsList, message as NewsItem]);
  }

  function onLikeMessageReceived(message: any) {
    console.info("onLikeReceived", message);
  }

  async function fetchLikeForATopic(newsTopicId: string): Promise<{ likes: number; dislikes: number }> {
    let totalLikes = 0;
    let totalDisLikes = 0;

    const likesOfPost: { [key: string]: Like[] } = {};

    await wakuGlobalContext!.node.store.queryWithOrderedCallback(
      [wakuGlobalContext!.likeEncoderDecoder.decoder],
      wakuMessage => {
        const wakuMessageDecoded = Like.decode(wakuMessage.payload);
        console.info("like of post message", wakuMessageDecoded);
        if (wakuMessageDecoded.rootId == newsTopicId) {
          if (likesOfPost[`${wakuMessageDecoded.userSignature}`]) {
            likesOfPost[`${wakuMessageDecoded.userSignature}`].push(wakuMessageDecoded);
          } else {
            likesOfPost[`${wakuMessageDecoded.userSignature}`] = [wakuMessageDecoded];
          }
        }
      },
    );

    Object.keys(likesOfPost).forEach(userIdentifier => {
      likesOfPost[userIdentifier].sort((x, y) => {
        return Number(y.timestamp) - Number(x.timestamp);
      });

      likesOfPost[userIdentifier][0].isLike ? totalLikes++ : totalDisLikes++;
    });

    return { likes: totalLikes, dislikes: totalDisLikes };
  }

  async function onLike(rootId: string) {
    const newLink = {
      isLike: true,
      rootId: rootId,
      userSignature: `userWallet-${rootId}`,
    };

    await createLike(wakuGlobalContext!.node, wakuGlobalContext!.likeEncoderDecoder.encoder, newLink);
  }
  async function onDisLike(rootId: string) {
    console.info("On-Dislike", rootId);

    const newLink = {
      isLike: false,
      rootId: rootId,
      userSignature: `userWallet-${rootId}`,
    };
    await createLike(wakuGlobalContext!.node, wakuGlobalContext!.likeEncoderDecoder.encoder, newLink);
  }

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
    (async () => {
      await wakuGlobalContext?.node.store.queryWithOrderedCallback(
        [wakuGlobalContext.rootEncoderDecoder.decoder],
        wakuMessage => {
          const wakuMessageDecoded = Root.decode(wakuMessage.payload);
          onMessageReceived(wakuMessageDecoded as unknown as Partial<NewsItem>);
        },
      );
    })();
  }, [wakuGlobalContext]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        {newsList.map(theNews => {
          return (
            <NewsItem
              {...theNews}
              key={`${theNews.id}-${Date.now()}`}
              onLike={() => onLike(theNews.id)}
              onDisLike={() => onDisLike(theNews.id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default News;
