import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { LinkGrid as LinkGridB } from "./Grid";

export const LinkCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated, collection.backfill);
    if (content.length < 1) {
        return null;
    }

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            <LinkGridB content={content} />
        </>
    );
};
