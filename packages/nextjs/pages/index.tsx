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
              <Image src="/logo_glasses.svg" width={420} height={100} alt="" />
              <div className="flex flex-col items-end">
                <p className="font-bold text-3xl">Speak up, gear up, clean up.</p>
                <p className="font-light text-xl mt-[-7px]">
                  Autonomous web3 awareness platform for <br />
                  incentivising reporting and solutions for reckless climate conduct.
                </p>
                <div className="flex flex-row justify-between items-center w-2/3">
                  <div className="flex flex-col translate-y-[-40px]">
                    <Image className="translate-y-12" src="/nounsspeakerbush.svg" width={90} height={90} alt="" />
                    <Image
                      className="translate-y-[-10px] translate-x-4"
                      src="/nouns-skull-loading.gif"
                      width={55}
                      height={55}
                      alt=""
                    />
                  </div>
                  <a className="btn btn-primary mr-[5rem]" href={"/speak-up"}>Speak up</a>
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
                <div className="text-4xl mt-0">Our mission</div>
              </div>
              <div className="text-xl">
                <p>Using Grassroots whistleblowers reporting concealed climate related risks can share their reports and case studies safely and anonymously. They can connect to their communities to share the personal and community impact of climate change and climate crimes and the community can participate in voting on and speaking up about the whistle blower claims.</p>
                <p>As we build further, users will be able to raise funding for investigations and for relief in a solution oriented approach to mitigate these climate risks before they advance.</p>
              </div>
            </div>
            <Image src="/map.png" width={700} height={400} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
