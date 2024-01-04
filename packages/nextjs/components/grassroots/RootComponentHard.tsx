import Image from "next/image";
import { RootItem } from "~~/types/grassroots/root";
import { dateToString } from "~~/utils/grassroots/date";

export interface RootComponentHardProps {
}

export const RootComponentHard = ({ }: RootComponentHardProps) => {
  const getSentiment = () => {
    const relation = 1;
    if (relation > 0) {
      return `+${relation} people support this`;
    }
    return relation + " people support this";
  };

  return (
    <div className="flex flex-col justify-center items-left text-neutral w-3/5 bg-neutral-content rounded-xl p-2">
      <div className="flex flex-col px-5 py-3">
        <div className="text-2xl font-bold">{"Dumping of plastic waste in the community creeks"}</div>
        <div className="mb-[-10px]">
          in <span className="text-md font-bold">{"Dumpton,  Jersey"}</span>
        </div>
        <p className="text-sm text-gray-400">{"1 January at 9:00"}</p>
      </div>

      <div className="px-5 pb-3 text-md">{"Some companies who have large amounts of industrial plastic waste are dumping in the creek in my community area. It’s causing plants and animals to get sick in the area. "}</div>

      <div className="w-full flex flex-row items-center justify-center">
        <Image src={"https://ichef.bbci.co.uk/news/976/cpsprodpb/5585/production/_118539812_067369333.jpg.webp"} width={400} height={250} alt="image" />
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
            />
            <Image
              src="/Icons/downarrow.svg"
              alt=""
              width={30}
              height={30}
              className="cursor-pointer hover:transition hover:scale-125 duration-100"
            />
          </div>
          {getSentiment()}
        </div>
        <div
          className="flex flex-row gap-1 cursor-pointer hover:transition hover:scale-105 duration-100"
        >
          <Image src="/Icons/replyarrow.svg" alt="" width={20} height={20} />
          <div>Speak-up</div>
        </div>
      </div>
    </div>
  );
};
