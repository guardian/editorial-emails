import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Padding } from "../../../../layout/Padding";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { DefaultCard } from "../../../../components/cards/DefaultCard";
import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";

export const DefaultCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection, salt }) => {
    const topCollection = collection.backfill.slice(0, 2);
    const gridContent = collection.backfill.slice(2, 6);
    const lightGrey = palette.neutral[97];

    return (
        <>
            <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
                <Multiline topPadding />
                <Heading heading={collection.displayName} />
            </TableRowCell>
            {topCollection.map(content => {
                return (
                    <>
                        <DefaultCard
                            content={content}
                            salt={salt}
                            size="large"
                        />
                        <Padding px={12} />
                    </>
                );
            })}
            {gridContent && <DefaultGrid content={gridContent} salt={salt} />}
        </>
    );
};
