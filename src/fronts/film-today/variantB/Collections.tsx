import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { DefaultCollection } from "./components/DefaultCollection";
import { MostViewedCollection } from "../../../collections/MostViewedCollection";
import { Padding } from "../../../layout/Padding";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
}> = ({ collections }) => {
    const renderedCollections = collections.map(collection => {
        const designType = getDesignType(collection);

        switch (designType) {
            case "default":
                if (collection.collectionType === "fast") {
                    return (
                        <>
                            <Padding px={12} />
                            <MostViewedCollection collection={collection} />
                        </>
                    );
                }

                return <DefaultCollection collection={collection} />;
        }
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
