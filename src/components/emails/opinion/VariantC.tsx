import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import {
    CommentCollection,
    EditorialCollection,
    MediaCollection,
    LinkCollection,
    DefaultCollection
} from "./collections/commentC/Collection";
import { getDesignType } from "../../../utils/getDesignType";

export const VariantC: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ frontId, collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated); // TODO support curated too
        const designType = getDesignType(content);

        if (collection.displayName === "Save 50% for three months") {
            return null; // ignore the jobs collection for now
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
