import React from "react";
import { Collection as ICollection } from "../../../../api";
import { TableRowCell } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { DefaultGrid } from "../../../../layout/Grid";
import { BorderDefaultCard } from "../../../../components/cards/BorderDefaultCard";

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
                    <BorderDefaultCard
                        content={firstCollection}
                        salt={salt}
                        size="large"
                    />
                    <Padding px={12} />
                    {secondCollection && (
                        <DefaultGrid
                            content={secondCollection}
                            salt={salt}
                            CardComponent={BorderDefaultCard}
                        />
                    )}
                    <Padding px={12} />
                    <BorderDefaultCard
                        content={thirdCollection}
                        salt={salt}
                        size="large"
                    />
                    <Padding px={12} />
                    {fourthCollection && (
                        <DefaultGrid
                            content={fourthCollection}
                            salt={salt}
                            CardComponent={BorderDefaultCard}
                        />
                    )}
                </>
            </TableRowCell>
        </>
    );
};
