import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { GenericCollection } from "../../../collections/GenericCollection";
import { InstagramCollection } from "../../../collections/InstagramCollection";
import { LinkCollection } from "./components/LinkCollection";
import { getDesignType } from "../../../utils/getDesignType";
import { CommentCollection } from "./components/CommentCollection";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
}> = ({ frontId, collections }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated); // TODO support curated too
        const designType = getDesignType(content);

        switch (designType) {
            case "comment":
                return (
                    <CommentCollection
                        frontId={frontId}
                        collection={collection}
                    />
                );
            case "editorial":
                return <InstagramCollection collection={collection} />;
            case "media":
                return <InstagramCollection collection={collection} />;
            case "link":
                // Ignore 'Guardian Subscribe/Masterclasses' collection without using 'display name'
                // Look at combination of content type (curated/backfill),
                // content length and collection type
                if (
                    collection.curated.length === 1 &&
                    collection.collectionType === "medium"
                ) {
                    return null;
                }

                return <LinkCollection collection={collection} />;
        }

        return <GenericCollection collection={collection} />;
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
