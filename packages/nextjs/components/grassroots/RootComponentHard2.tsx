import Image from "next/image";
import { RootItem } from "~~/types/grassroots/root";
import { dateToString } from "~~/utils/grassroots/date";

export interface RootComponentHard2Props {
}

export const RootComponentHard2 = ({ }: RootComponentHard2Props) => {
  const getSentiment = () => {
    const relation = 3;
    if (relation > 0) {
      return `+${relation} people support this`;
    }
    return relation + " people support this";
  };

  return (
    <div className="flex flex-col justify-center items-left text-neutral w-3/5 bg-neutral-content rounded-xl p-2">
      <div className="flex flex-col px-5 py-3">
        <div className="text-2xl font-bold">{"Excessive Air Pollution from Local Factory"}</div>
        <div className="mb-[-10px]">
          in <span className="text-md font-bold">{"Gaston, Western Nowhere"}</span>
        </div>
        <p className="text-sm text-gray-400">{"4 January at 9:00"}</p>
      </div>

      <div className="px-5 pb-3 text-md">{" I've been noticing a significant increase in air pollution levels near our community due to emissions from a local factory. The air quality is becoming unbearable, and I'm concerned about the health impact on residents, especially children and the elderly. I’ve measured air samples and it is 500% the legal PPM in pollutants. "}</div>

      <div className="w-full flex flex-row items-center justify-center">
        <Image src={"https://www.vijesti.me/data/images/2021/02/18/09/5299759_shutterstock-1523658188_ls.jpg"} width={400} height={250} alt="image" />
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
