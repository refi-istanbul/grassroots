import React, { useState } from "react";
import { Button } from "~~/components/misc/Button";
import { Input } from "~~/components/misc/Input";
import { TextArea } from "~~/components/misc/TextArea";

/**
 * Site footer
 */

type SpeakUpFormProps = {
  onSubmit: any;
  onImageURLChange: any;
};

type SpeakUpFormDataType = {
  title: string;
  location: string;
  description: string;
  imageURL: string;
  relatedPosts: string;
  tag: string;
};

export const SpeakUpForm = ({ onSubmit, onImageURLChange }: SpeakUpFormProps) => {
  const [speakUpFormData, setSpeakUpFormData] = useState<SpeakUpFormDataType>({
    title: "",
    description: "",
    location: "",
    imageURL: "",
    relatedPosts: "",
    tag: "",
  });

  const submitForm = () => {
    onSubmit(speakUpFormData);
    setSpeakUpFormData({
        title: "",
        description: "",
        location: "",
        imageURL: "",
        relatedPosts: "",
        tag: ""
    });
  };

  // ------ Updates ----------
  const updateTitle = (newHeadTitle: string) => {
    setSpeakUpFormData({ ...speakUpFormData, title: newHeadTitle });
  };
  const updateDescription = (newValue: string) => {
    setSpeakUpFormData({ ...speakUpFormData, description: newValue });
  };
  const updateTag = (newValue: string) => {
    setSpeakUpFormData({ ...speakUpFormData, tag: newValue });
  };
  const updateImageURL = (newValue: string) => {
    setSpeakUpFormData({ ...speakUpFormData, imageURL: newValue });
    onImageURLChange(newValue);
  };
  const updateLocation = (newValue: string) => {
    setSpeakUpFormData({ ...speakUpFormData, location: newValue });
  };
  const updateRelatedPost = (newValue: string) => {
    setSpeakUpFormData({ ...speakUpFormData, relatedPosts: newValue });
  };
  // -----------------------------

  return (
    <div className="flex flex-col justify-center items-left text-neutral w-4/5 bg-neutral-content rounded-xl">
      <div className="py-5 px-1 mr-11 ml-7">
        <div className="w-full">
          <Input
            full
            content={speakUpFormData?.title}
            setContent={updateTitle}
            placeholder={"News head line"}
            type={"string"}
            label={"Head Title"}
            classes={{
              width: "full",
              padding: "2 mx-4 my-1",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />

          <TextArea
            full
            content={speakUpFormData?.description}
            setContent={updateDescription}
            label={"Details"}
            rows={3}
            classes={{
              width: "full",
              padding: "2 mx-4 my-1",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />

          <Input
            full
            content={speakUpFormData?.tag}
            setContent={updateTag}
            placeholder={"Climate"}
            type={"string"}
            label={"Tag"}
            classes={{
              width: "full",
              padding: "2 mx-4 my-1",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />

          <Input
            full
            content={speakUpFormData?.location}
            setContent={updateLocation}
            placeholder={""}
            type={"string"}
            label={"Location"}
            classes={{
              width: "full",
              padding: "2 mx-4 my-1",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />

          <Input
            full
            content={speakUpFormData?.imageURL}
            setContent={updateImageURL}
            placeholder={"IPFS link here"}
            type={"string"}
            label={"Link"}
            classes={{
              width: "full",
              padding: "2 mx-4 my-1",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />

          <Input
            full
            content={speakUpFormData?.relatedPosts}
            setContent={updateRelatedPost}
            placeholder={""}
            type={"string"}
            label={"Related post"}
            classes={{
              width: "full",
              padding: "2 mx-4 my-1",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />

          <Button
            text={"Speak Up!"}
            onClick={submitForm}
            classes={{
              width: "full",
              padding: "2 mx-4 mt-3",
              textColor: "neutral",
              textSize: "md",
            }}
          />
        </div>
      </div>
    </div>
  );
};
