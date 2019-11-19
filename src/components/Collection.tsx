import React from "react";
import { Collection as ICollection } from "../api";
import { Card } from "./cards/Card";
import { CommentCard } from "./cards/CommentCard";
import { MediaCard } from "./cards/MediaCard";
import { DefaultGrid, CommentGrid, LinkGrid } from "../layout/Grid";
import { Padding } from "../layout/Padding";
import { Heading } from "./Heading";
import { Multiline } from "./Multiline";

export const DefaultCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    if (collection.backfill.length < 1) {
        return null;
    }

    // TODO handle curated collections
    const rest = collection.backfill.slice(1);

    const contentOne = collection.backfill[0];

    return (
        <>
            <Multiline />
            <Heading heading={collection.displayName} />

            <Card content={contentOne} salt={salt} size={"large"} />
            <Padding px={10} />

            <Padding px={10} />

            {rest && <DefaultGrid content={rest} salt={salt} />}
        </>
    );
};

export const EditorialCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    // TODO handle curated collections
    const rest = collection.backfill.slice(2);

    const contentOne = collection.backfill[0];

    // TODO
    return (
        <>
            <Multiline />
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

const frontIdShouldShowCommentGridImages = (frontId: string): boolean => {
    if (frontId === "email/opinion") {
        return false;
    }
    return true;
};

export const CommentCollection: React.FC<{
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
            <Multiline />
            <Heading heading={collection.displayName} />

            <CommentCard
                content={c0}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
            <Padding px={10} />

            <CommentCard
                content={c1}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
            <Padding px={10} />

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
            <Padding px={10} />

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

export const MediaCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const items = collection.backfill.map(content => (
        <MediaCard content={content} salt={salt} />
    ));

    return (
        <>
            <Multiline />
            <Heading heading={collection.displayName} />
            {items}
        </>
    );
};

export const LinkCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    if (collection.curated.length < 1) {
        return null;
    }

    const content = collection.curated;

    return (
        <>
            <Multiline />
            <Heading heading={collection.displayName} />

            {content && <LinkGrid content={content} salt={salt} />}
        </>
    );
};
