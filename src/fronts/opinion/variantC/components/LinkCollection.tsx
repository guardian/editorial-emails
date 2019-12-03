import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { LinkGrid as LinkGridC } from "./Grid";

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
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            {content && <LinkGridC content={content} salt={salt} />}
        </>
    );
};
