import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { CommentCollection } from "./components/CommentCollection";
import { EditorialCollection } from "./components/EditorialCollection";
import { MediaCollection } from "./components/MediaCollection";
import { LinkCollection } from "./components/LinkCollection";
import { DefaultCollection } from "./components/DefaultCollection";

import { getDesignType } from "../../../utils/getDesignType";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ frontId, collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated); // TODO support curated too
        const designType = getDesignType(content);

        switch (designType) {
            case "editorial":
                return (
                    <EditorialCollection collection={collection} salt={salt} />
                );
            case "comment":
                return (
                    <CommentCollection
                        frontId={frontId}
                        collection={collection}
                        salt={salt}
                    />
                );
            case "media":
                return <MediaCollection collection={collection} salt={salt} />;
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
            case "default":
                return (
                    <DefaultCollection collection={collection} salt={salt} />
                );
        }
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
