import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";

export const DefaultCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection, salt }) => {
    const content = collection.backfill;
    const lightGrey = palette.neutral[97];

    return (
        <>
            <TableRowCell
                tdStyle={{ backgroundColor: lightGrey, padding: "0" }}
            >
                <Multiline topPadding />
                <Heading heading={collection.displayName} />
            </TableRowCell>
            <DefaultGrid content={content} salt={salt} />
        </>
    );
};
