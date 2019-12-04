import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { shouldIgnoreCollection } from "../../../utils/shouldIgnoreCollection";
import { TopCollection } from "./components/TopCollection";
import { CommentCollection } from "./components/CommentCollection";
import { LinkCollection } from "./components/LinkCollection";
import { DefaultCollection } from "./components/DefaultCollection";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated);
        const designType = getDesignType(content);

        switch (designType) {
            case "comment":
                // Ignore 'Media by Sector' collection which has the 'comment' design type.
                // TODO: refactor this condition to be more reliable and last long term
                // Or otherwise remove condition and accept the jobs/masterclasses collection
                if (
                    collection.curated.length === 1 &&
                    collection.collectionType === "free-text"
                ) {
                    return null;
                }

                return (
                    <CommentCollection collection={collection} salt={salt} />
                );
            case "link":
                return <LinkCollection collection={collection} salt={salt} />;
            case "default":
                if (collection.displayName === "Top stories") {
                    return (
                        <TopCollection collection={collection} salt={salt} />
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
