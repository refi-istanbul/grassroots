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
              top: "47%",
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
                <div className="flex flex-row justify-between items-center w-2/3">
                  <div className="flex flex-col translate-y-[-30px]">
                    <Image className="translate-y-12" src="/nounsspeakerbush.svg" width={90} height={90} alt="" />
                    <Image
                      className="translate-y-[-10px] translate-x-4"
                      src="/nouns-skull-loading.gif"
                      width={55}
                      height={55}
                      alt=""
                    />
                  </div>
                  <button className="btn btn-primary mr-[5rem]">Speak up</button>
                </div>
              </div>
            </div>
          </div>
          <Image src={"/landing-bg.png"} fill alt="background image" quality="100" />
        </div>

        {/* Section 2 */}
        <div className="flex flex-col w-full h-100vh bg-[#C6E8BE] py-36 items-center justify-center gap-16 rounded-b-[100px]">
          <div className="flex flex-row w-4/5 justify-between items-center">
            <div className="flex flex-col gap-10 w-2/5">
              <div className="flex flex-col">
                <div className="text-2xl">mint now</div>
                <div className="text-4xl mt-0">Proof of Verification</div>
              </div>
              <div className="text-xl">
                Refound's mission is part of the Regenerative Finance (ReFi) movement, specifically to leverage
                blockchain to help journalists and photographers directly sell their content to the public and news
                media at higher margins and with greater financial control, helping regenerate their economic cycle.
              </div>
            </div>
            <Image src="/map.png" width={700} height={400} alt="" />
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
