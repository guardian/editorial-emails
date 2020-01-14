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
}> = ({ frontId, collections }) => {
    const renderedCollections = collections.map(collection => {
        const designType = getDesignType(collection);

        switch (designType) {
            case "editorial":
                return <EditorialCollection collection={collection} />;
            case "comment":
                return (
                    <CommentCollection
                        frontId={frontId}
                        collection={collection}
                    />
                );
            case "media":
                return <MediaCollection collection={collection} />;
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
            case "default":
                return <DefaultCollection collection={collection} />;
        }
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
