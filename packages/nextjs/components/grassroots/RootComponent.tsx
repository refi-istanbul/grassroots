import Image from "next/image";
import { RootItem } from "~~/types/grassroots/root";
import { dateToString } from "~~/utils/grassroots/date";

export interface RootComponentProps {
  r: RootItem;
  onLike: any;
  onDisLike: any;
  onSpeakUp: any;
}

export const RootComponent = ({ r, onLike, onDisLike, onSpeakUp }: RootComponentProps) => {
  const getSentiment = () => {
    const relation = r.likes - r.dislikes;
    if (relation > 0) {
      return `+${relation} people support this`;
    }
    return relation + " people support this";
  };

  return (
    <div className="flex flex-col justify-center items-left text-neutral w-3/5 bg-neutral-content rounded-xl p-2">
      <div className="flex flex-col px-5 py-3">
        <div className="text-2xl font-bold">{r.title}</div>
        <div className="mb-[-10px]">
          in <span className="text-md font-bold">{r.location}</span>
        </div>
        <p className="text-sm text-gray-400">{dateToString(r.timestamp)}</p>
      </div>

      <div className="px-5 pb-3 text-md">{r.description}</div>

      <div className="w-full flex flex-row items-center justify-center">
        <Image src={r.imageURL} width={400} height={250} alt="image" />
      </div>

      <div className="flex flex-row justify-between items-center px-5 pt-2 pb-2 bg-[#efefef] rounded-b-xl">
        <div className="flex flex-row gap-1 items-center">
          <div className="flex flex-row gap-1 justify-center items-center">
            <Image
              src="/Icons/uparrow.svg"
              alt=""
              width={30}
              height={30}
              className="cursor-pointer hover:transition hover:scale-125 duration-100"
              onClick={onLike}
            />
            <Image
              src="/Icons/downarrow.svg"
              alt=""
              width={30}
              height={30}
              className="cursor-pointer hover:transition hover:scale-125 duration-100"
              onClick={onDisLike}
            />
          </div>
          {getSentiment()}
        </div>
        <div
          className="flex flex-row gap-1 cursor-pointer hover:transition hover:scale-105 duration-100"
          onClick={onSpeakUp}
        >
          <Image src="/Icons/replyarrow.svg" alt="" width={20} height={20} onClick={onDisLike} />
          <div>Speak-up</div>
        </div>
      </div>
      <div>
          {r.relatedPosts.length != 0 && <div className="m-3"> Related post: {r.relatedPosts}</div>}
      </div>
    </div>
  );
};
