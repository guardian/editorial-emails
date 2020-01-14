import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { InstagramCollection } from "../../../collections/InstagramCollection";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
}> = ({ collections }) => {
    const renderedCollections = collections.map(collection => {
        const designType = getDesignType(collection);

        switch (designType) {
            case "default":
                return <InstagramCollection collection={collection} />;
        }
    });

    return (
        <TableRowCell tdStyle={{ padding: "0" }}>
            {renderedCollections}
        </TableRowCell>
    );
};
