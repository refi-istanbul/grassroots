import type { NextPage } from "next";
import {Input} from "~~/components/misc/Input";

const NewPost: NextPage = () => {
    return (
        <>
            <div className="flex items-center flex-col flex-grow pt-10">
                <h1 className="text-center mb-8">
                    <span className="block text-2xl mb-2"> News post </span>
                    <span className="block text-4xl font-bold">  </span>
                    <Input
                        full
                        content={"deal?.twitterHandle"}
                        setContent={"updateTwitterHandle"}
                        placeholder={"Paste the link here..."}
                        type={"string"}
                        label={"Twitter Account of the Creator"}
                        classes={{
                            width: "full",
                            padding: "2 px-4",
                            textColor: "neutral",
                            textSize: "md",
                            borderColor: "accent-focus",
                            hover: "transition hover:border-2 hover:border-accent-content duration-300",
                        }}
                    />
                </h1>

                <div className="flex-grow w-full mt-16 px-8 py-12">
                    <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">Body</div>
                </div>
            </div>
        </>
    );
};

export default NewPost;
