import React from "react";
import { Collection as ICollection } from "../api";
import { Card } from "./cards/Card";
import { CommentCard } from "./cards/CommentCard";
import { MediaCard } from "./cards/MediaCard";
import { DefaultGrid, CommentGrid } from "../layout/Grid";
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
    const rest = collection.backfill.slice(2);

    const contentOne = collection.backfill[0];
    const contentTwo = collection.backfill[1];

    return (
        <>
            <Multiline />
            <Heading heading={collection.displayName} />

            <Card content={contentOne} salt={salt} size={"large"} />
            <Padding px={10} />

            {contentTwo && (
                <Card content={contentTwo} salt={salt} size={"large"} />
            )}
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
            <Padding px={10} />
        </>
    );
};

export const CommentCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    // TODO handle curated collections
    const rest = collection.backfill.slice(2);

    const contentOne = collection.backfill[0];
    const contentTwo = collection.backfill[1];

    // TODO
    return (
        <>
            <Multiline />
            <Heading heading={collection.displayName} />

            <CommentCard
                content={contentOne}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
            <Padding px={10} />

            {contentTwo && (
                <CommentCard
                    content={contentTwo}
                    salt={salt}
                    size={"large"}
                    shouldShowImage={false}
                />
            )}
            <Padding px={10} />

            <CommentGrid content={rest} salt={salt} />
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
