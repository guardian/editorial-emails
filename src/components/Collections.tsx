import React from "react";
import { Collection as ICollection } from "../api";
import { DefaultCollection } from "./Collection";
import { TableRowCell } from "../layout/Table";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const renderedCollections = collections.map(collection => (
        <DefaultCollection collection={collection} salt={salt} />
    ));

    return (
        <TableRowCell tdStyle={{ padding: "0" }}>
            {renderedCollections}
        </TableRowCell>
    );
};
