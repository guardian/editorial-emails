import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
// import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";
import { OverlayCard } from "../../../../components/cards/OverlayCard";

export const DefaultCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection, salt }) => {
    const content = collection.backfill;

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <DefaultGrid
                content={content}
                salt={salt}
                component={OverlayCard}
            />
        </>
    );
};
