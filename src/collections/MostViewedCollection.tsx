import React from "react";
import { Collection as ICollection } from "../api";
import { TableRowCell } from "../layout/Table";
import { Heading } from "../components/Heading";
import { Padding } from "../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../components/Multiline";
import { MostViewedCard } from "../components/cards/MostViewedCard";

export const MostViewedCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection }) => {
    const content = collection.backfill.concat(collection.curated);
    if (content.length < 1) {
        return null;
    }

    const lightGrey = palette.neutral[97];

    return (
        <TableRowCell tableStyle={{ backgroundColor: lightGrey }}>
            <Padding px={12} />
            <Multiline />
            <Heading heading={collection.displayName} />
            {content.map((story, index) => (
                <>
                    <MostViewedCard content={story} index={index + 1} />
                    {index < content.length - 1 && (
                        <Padding px={12} backgroundColor={lightGrey} />
                    )}
                </>
            ))}
        </TableRowCell>
    );
};
