import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { TopCollection } from "./components/TopCollection";
import { CommentCollection } from "./components/CommentCollection";
import { LinkCollection } from "./components/LinkCollection";
import { GenericCollection } from "../../../collections/GenericCollection";
import { Padding } from "../../../layout/Padding";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
}> = ({ collections }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated);
        const designType = getDesignType(content);

        switch (designType) {
            case "comment":
                // Ignore 'Media by Sector' collection without using 'display name'
                // Look at combination of content type (curated/backfill),
                // content length and collection type
                if (
                    collection.curated.length === 1 &&
                    collection.collectionType === "free-text"
                ) {
                    return null;
                }

                return <CommentCollection collection={collection} />;
            case "link":
                return <LinkCollection collection={collection} />;
            case "default":
                // Render different collection for 'TV & Radio' collection without using 'display name'
                // Look at 'tv-and-radio' substring in href
                if (
                    collection.href &&
                    collection.href.indexOf("tv-and-radio") > -1
                ) {
                    return (
                        <>
                            <GenericCollection collection={collection} />
                            <Padding px={12} />
                        </>
                    );
                }

                return <TopCollection collection={collection} />;
        }
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
