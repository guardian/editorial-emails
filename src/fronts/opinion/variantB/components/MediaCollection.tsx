import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { MediaCard } from "./MediaCard";
import { Multiline } from "./../../../../components/Multiline";

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
