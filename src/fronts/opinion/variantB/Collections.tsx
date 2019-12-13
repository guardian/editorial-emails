import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { GenericCollection } from "../../../collections/GenericCollection";
import { InstagramCollection } from "../../../collections/InstagramCollection";
import { LinkCollection } from "./components/LinkCollection";
// import { LinkCollection } from "../variantY/components/LinkCollection";
import { getDesignType } from "../../../utils/getDesignType";
import { CommentCollection } from "./components/CommentCollection";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ frontId, collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated); // TODO support curated too
        const designType = getDesignType(content);

        switch (designType) {
            case "comment":
                return (
                    <CommentCollection
                        frontId={frontId}
                        collection={collection}
                        salt={salt}
                    />
                );
            case "editorial":
                return (
                    <InstagramCollection collection={collection} salt={salt} />
                );
            case "media":
                return (
                    <InstagramCollection collection={collection} salt={salt} />
                );
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

                return <LinkCollection collection={collection} salt={salt} />;
        }

        return <GenericCollection collection={collection} salt={salt} />;
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
