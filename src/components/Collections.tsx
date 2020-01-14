import React from "react";
import { Collection as ICollection } from "../api";
import { GenericCollection } from "../collections/GenericCollection";
import { TableRowCell } from "../layout/Table";
import { Padding } from "../layout/Padding";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
}> = ({ collections }) => {
    const renderedCollections = collections.map((collection, index) => (
        <>
            <GenericCollection collection={collection} />
            {index < collections.length - 1 && <Padding px={12} />}
        </>
    ));

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
