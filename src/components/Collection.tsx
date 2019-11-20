import React from "react";
import { Collection as ICollection } from "../api";
import { Card } from "./cards/Card";
import { MediaCard } from "./cards/MediaCard";
import { Card as CommentCard } from "./tests/commentB/Card";
import { DefaultGrid, LinkGrid } from "../layout/Grid";
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
