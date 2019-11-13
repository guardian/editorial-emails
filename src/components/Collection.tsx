import React from "react";
import { Collection as ICollection } from "../api";
import { Card } from "./cards/Card";
import { DefaultGrid, CommentGrid } from "../layout/Grid";
import { Padding } from "../layout/Padding";
import { Content } from "../api";

type CollectionStyle = "default" | "comment";

const collectionStyle = (content: Content[]): CollectionStyle => {
    if (content.every(c => c.cardStyle.type === "Comment")) {
        return "comment";
    }

    return "default";
};

export const Collection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    // TODO handle curated collections
    const rest = collection.backfill.slice(2);

    const contentOne = collection.backfill[0];
    const contentTwo = collection.backfill[1];
    const designType = collectionStyle(collection.backfill);

    return (
        <>
            <Card content={contentOne} salt={salt} size={"large"} />
            <Padding px={10} />

            <Card content={contentTwo} salt={salt} size={"large"} />
            <Padding px={10} />

            {designType === "comment" ? (
                <CommentGrid content={rest} salt={salt} />
            ) : (
                <DefaultGrid content={rest} salt={salt} />
            )}
        </>
    );
};
