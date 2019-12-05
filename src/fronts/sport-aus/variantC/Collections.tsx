import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { TopCollection } from "./components/TopCollection";
import { DefaultCollection } from "./components/DefaultCollection";
import { Padding } from "../../../layout/Padding";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated);
        const designType = getDesignType(content);

        console.log("designType: ", designType);

        switch (designType) {
            case "default":
                // Render different collection for 'TV & Radio' collection without using 'display name'
                // Look at 'tv-and-radio' substring in href
                if (collection.href === "au/sport") {
                    return (
                        <>
                            <TopCollection
                                collection={collection}
                                salt={salt}
                            />
                            <Padding px={12} />
                        </>
                    );
                }

                return (
                    <DefaultCollection collection={collection} salt={salt} />
                );
        }
    });

    return (
        <TableRowCell tdStyle={{ padding: "0" }}>
            {renderedCollections}
        </TableRowCell>
    );
};
