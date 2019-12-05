import React from "react";
import { Collection as ICollection } from "../../../../api";
import { TableRowCell } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { OverlayCard } from "../../../../components/cards/OverlayCard";
import { DefaultGrid } from "../../../../layout/Grid";

export const TopCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection, salt }) => {
    const firstCollection = collection.backfill[0];
    const secondCollection = collection.backfill.slice(1, 3);
    const thirdCollection = collection.backfill[3];
    const fourthCollection = collection.backfill.slice(4, 6);
    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <TableRowCell tdStyle={{ padding: "0 10px" }}>
                <>
                    <OverlayCard content={firstCollection} salt={salt} />
                    <Padding px={12} />
                    {secondCollection && (
                        <DefaultGrid
                            content={secondCollection}
                            salt={salt}
                            CardComponent={OverlayCard}
                        />
                    )}
                    <Padding px={12} />
                    <OverlayCard content={thirdCollection} salt={salt} />
                    <Padding px={12} />
                    {fourthCollection && (
                        <DefaultGrid
                            content={fourthCollection}
                            salt={salt}
                            CardComponent={OverlayCard}
                        />
                    )}
                </>
            </TableRowCell>
        </>
    );
};
