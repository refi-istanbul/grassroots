import React from "react";
import {HeartIcon} from "@heroicons/react/24/outline";

/**
 * Site footer
 */


type NewsItemProps = {
    timestamp: string;
    description: string;
    title: string;
    likes: number;
    dislikes: number;
    onLike: any;
    onDisLike: any;
};


export const NewsItem = ({
                             timestamp, description, title, likes, dislikes, onLike, onDisLike
                         }: NewsItemProps) => {
    return (
        <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
            <div className="w-full">
                <h2 className="m-0 menu-title textarea-lg">
                    {title}
                </h2>

                <p><span> {description} </span></p>
                <p>{timestamp}</p>

                <p>Like: {likes}</p>
                <p>Dislike: {dislikes}</p>
                <button className="btn btn-sm mr-4" onClick={onLike}> Like </button>
                <button className="btn btn-sm btn-error mr-4" onClick={onDisLike} > Dislike </button>
            </div>
        </div>
    );
};
