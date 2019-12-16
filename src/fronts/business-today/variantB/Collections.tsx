import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { InstagramCollection } from "../../../collections/InstagramCollection";
import { LiveCollection } from "./components/LiveCollection";
import { CommentCollection } from "./components/CommentCollection";
import { DefaultCollection } from "./components/DefaultCollection";
import { FreeTextCollection } from "./components/FreeTextCollection";
import { MostViewedCollection } from "./components/MostViewedCollection";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated);
        const designType = getDesignType(content);

        console.log(`${collection.displayName} (${designType})`);

        // Business live (default)
        // Headlines (default)
        // Today's agenda (link)
        // Opinion (comment)
        // Spotlight (default)
        // Popular on business (default)
        // Flying soon and looking for the perfect gift? (link)
        switch (designType) {
            case "comment": {
                // Opinion (comment)
                // COMMENT COLLECTION
                return (
                    <CommentCollection collection={collection} salt={salt} />
                );
            }

            case "link":
                // IGNORE COMMERCIAL CONTAINER
                // Flying soon and looking for the perfect gift? (link)
                if (
                    collection.curated.length === 1 &&
                    collection.collectionType === "free-text"
                ) {
                    return null;
                }

                // Today's agenda (link)
                // FREE-TEXT COLLECTION
                return (
                    <FreeTextCollection collection={collection} salt={salt} />
                );
            case "default":
                if (
                    collection.curated.length === 1 &&
                    collection.collectionType === "slow"
                ) {
                    // Spotlight (default)
                    // INSTAGRAM
                    return (
                        <InstagramCollection
                            collection={collection}
                            salt={salt}
                        />
                    );
                }

                if (
                    collection.backfill.length === 5 &&
                    collection.collectionType === "fast"
                ) {
                    // Popular on business (default)
                    // MOST VIEWED
                    return (
                        <MostViewedCollection
                            collection={collection}
                            salt={salt}
                        />
                    );
                }

                if (
                    collection.curated.length === 1 &&
                    collection.collectionType === "medium"
                ) {
                    // Business live (default)
                    // LIVE COLLECTION
                    return (
                        <LiveCollection collection={collection} salt={salt} />
                    );
                }

                // Headlines (default)
                // DEFAULT COLLECTION
                return (
                    <DefaultCollection collection={collection} salt={salt} />
                );
        }
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
