import React from "react";
import { Collection as ICollection } from "../../../api";
import { Card as CommentCard } from "././../commentB/Card";
import { MediaCard } from "./MediaCard";
import { Padding } from "../../../layout/Padding";
import { Heading } from "./../../Heading";
import { Multiline } from "./../../Multiline";
import { Grid as CommentGrid } from "../commentB/Grid";

const frontIdShouldShowCommentGridImages = (frontId: string): boolean => {
    if (frontId === "email/opinion") {
        return false;
    }
    return true;
};

export const Collection: React.FC<{
    frontId: string;
    collection: ICollection;
    salt: string;
}> = ({ frontId, collection, salt }) => {
    // TODO handle curated collections

    const c0 = collection.backfill[0];
    const c1 = collection.backfill[1];
    const grid_2_5 = collection.backfill.slice(2, 6);
    const c6 = collection.backfill[6];
    const grid_7_8 = collection.backfill.slice(7, 9);
    const c9 = collection.backfill[9];

    // TODO
    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <CommentCard
                content={c0}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
            <Padding px={12} />

            <CommentCard
                content={c1}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
            <Padding px={12} />

            <CommentGrid
                content={grid_2_5}
                salt={salt}
                shouldShowGridImages={frontIdShouldShowCommentGridImages(
                    frontId
                )}
            />

            <CommentCard
                content={c6}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
            <Padding px={12} />

            <CommentGrid
                content={grid_7_8}
                salt={salt}
                shouldShowGridImages={frontIdShouldShowCommentGridImages(
                    frontId
                )}
            />

            <CommentCard
                content={c9}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
        </>
    );
};

export const EditorialCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const contentOne = collection.backfill[0];

    // TODO
    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <CommentCard
                content={contentOne}
                salt={salt}
                size={"large"}
                shouldShowImage={true}
            />
        </>
    );
};

export const MediaCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const items = collection.backfill.map(content => (
        <MediaCard content={content} salt={salt} />
    ));

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            {items}
        </>
    );
};
