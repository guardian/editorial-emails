import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Heading } from "../../../../components/Heading";
import { Padding } from "../../../../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../../../components/Multiline";

export const FreeTextCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const content = collection.curated.concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const lightGrey = palette.neutral[97];

    return (
        <>
            <Padding px={12} backgroundColor={lightGrey} />
            <Multiline />
            <Heading
                heading={collection.displayName}
                backgroundColor={lightGrey}
            />
            <DefaultGrid content={content} salt={salt} />
        </>
    );
};
