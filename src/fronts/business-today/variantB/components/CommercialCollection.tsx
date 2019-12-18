import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Heading } from "../../../../components/Heading";
import { palette } from "@guardian/src-foundations";
import { CommercialCard } from "../../../../components/cards/CommercialCard";
import { Padding } from "../../../../layout/Padding";

export const CommercialCollection: React.FC<{
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
            <Heading
                heading={collection.displayName}
                backgroundColor={lightGrey}
            />
            {content.map((story, index) => (
                <>
                    <CommercialCard content={story} salt={salt} />
                    {index < content.length - 1 && (
                        <Padding px={12} backgroundColor={lightGrey} />
                    )}
                </>
            ))}
        </>
    );
};
