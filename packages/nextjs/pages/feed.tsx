import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Feed: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Grassroots Feed</span>
          </h1>
        </div>

        <div className="flex-grow w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">Body</div>
        </div>
      </div>
    </>
  );
};

export default Feed;
