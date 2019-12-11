import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { GenericCollection } from "../../../collections/GenericCollection";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ frontId, collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        return <GenericCollection collection={collection} salt={salt} />;
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
