import React from "react";
import { Collection as ICollection } from "../../api";
import { TableRowCell } from "../../layout/Table";
import {
    CommentCollection,
    EditorialCollection,
    MediaCollection,
    LinkCollection,
    DefaultCollection
} from "./collections/opinionB/Collection";
import { getDesignType } from "../../utils/getDesignType";

export const VariantB: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ frontId, collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated); // TODO support curated too
        const designType = getDesignType(content);

        // Ignore the jobs/masterclasses collection for now
        // The collection displayName changes over time and isn't reliable enough for this condition
        // So intead, we use a different, also unreliable approach of checking for a collection
        // with one and only one curated item.
        // TODO: refactor this condition to be more reliable and last long term
        // Or otherwise remove condition and accept the jobs/masterclasses collection
        if (collection.curated.length === 1) {
            return null;
        }

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
                return <LinkCollection collection={collection} salt={salt} />;
            case "default":
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
