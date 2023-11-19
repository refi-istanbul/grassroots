import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex flex-col text-primary-content">
        {/* Section 1 */}
        <div className="w-full h-[100vh] relative object-cover ">
          {/* The child element */}
          <div
            style={{
              // use absolute position for the child element
              position: "absolute",
              top: "48%",
              left: "24%",
              transform: "translate(-50%, -50%)",
              // use higher zIndex than the image
              zIndex: 1,
            }}
          >
            <div className="relative">
              <Image src="/logowithtext.png" width={420} height={100} alt="" />
              <div className="flex flex-col items-end">
                <p className="font-bold text-3xl">Speak up, gear up, clean up.</p>
                <p className="font-light text-xl mt-[-7px]">
                  Autonomous web3 awareness platform for <br />
                  incentivising change against climate crimes.
                </p>
                <button className="btn btn-primary mr-[5rem]">Speak up</button>
              </div>
            </div>
          </div>
          <Image src={"/landing-bg.png"} fill alt="background image" quality="100" />
        </div>

        {/* Section 2 */}
        <div className="flex flex-col w-full h-100vh bg-[#C6E8BE]">
          <div className="flex flex-row w-2/3 justify-between items-center">
            <div className=""></div>
          </div>
          <div className="w-1/3 text-md">
            Our decentralized application provides journalists a platform to share their content, monetize it, and
            maintain anonymity and safety by using a wallet sign-in.
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
