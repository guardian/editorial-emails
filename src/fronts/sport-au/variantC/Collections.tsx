import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { TopCollection } from "./components/TopCollection";
import { DefaultCollection } from "./components/DefaultCollection";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
}> = ({ collections }) => {
    const renderedCollections = collections.map(collection => {
        const designType = getDesignType(collection);

        switch (designType) {
            case "default":
                // Render different collection for 'Top stories' collection without using 'display name'
                // Look at 'au/sport' value in href, which is not set in the other collection
                if (collection.href === "au/sport") {
                    return <TopCollection collection={collection} />;
                }

                return <DefaultCollection collection={collection} />;
        }
    });

    return (
        <TableRowCell tdStyle={{ padding: "0" }}>
            {renderedCollections}
        </TableRowCell>
    );
};
