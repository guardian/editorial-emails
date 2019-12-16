import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { MostViewedCollection } from "../../../collections/MostViewedCollection";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated);
        const designType = getDesignType(content);

        switch (designType) {
            case "default":
                return (
                    <MostViewedCollection collection={collection} salt={salt} />
                );
        }
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
