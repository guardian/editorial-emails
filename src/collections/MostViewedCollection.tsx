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
        <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
            <Padding px={12} />
            <Multiline />
            <Heading heading={collection.displayName} />
            {content.slice(0, 10).map((story, index) => (
                <>
                    <MostViewedCard content={story} index={String(index + 1)} />
                    <Padding px={12} backgroundColor={lightGrey} />
                </>
            ))}
        </TableRowCell>
    );
};