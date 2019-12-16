import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { MediaCardB } from "../../../../components/cards/MediaCardB";
import { Multiline } from "./../../../../components/Multiline";

export const MediaCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const items = collection.backfill.map(content => (
        <MediaCardB content={content} salt={salt} />
    ));

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            {items}
        </>
    );
};
