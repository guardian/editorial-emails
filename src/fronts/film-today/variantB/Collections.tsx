import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { DefaultCollection } from "./components/DefaultCollection";
import { MostViewedCollection } from "../../../Collections/MostViewedCollection";
import { Padding } from "../../../layout/Padding";

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
                if (collection.collectionType === "fast") {
                    return (
                        <>
                            <Padding px={12} />
                            <MostViewedCollection
                                collection={collection}
                                salt={salt}
                            />
                        </>
                    );
                }

                return (
                    <DefaultCollection collection={collection} salt={salt} />
                );
        }
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
