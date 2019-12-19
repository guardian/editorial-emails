import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { InstagramCollection } from "../../../collections/InstagramCollection";
import { LiveCollection } from "./components/LiveCollection";
import { CommentCollection } from "./components/CommentCollection";
import { CommercialCollection } from "./components/CommercialCollection";
import { DefaultCollection } from "./components/DefaultCollection";
import { FreeTextCollection } from "./components/FreeTextCollection";
import { MostViewedCollection } from "../../../collections/MostViewedCollection";

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated);
        const designType = getDesignType(content);

        switch (designType) {
            case "comment": {
                return (
                    <CommentCollection collection={collection} salt={salt} />
                );
            }

            case "link":
                if (
                    collection.curated.length === 1 &&
                    collection.collectionType === "medium"
                ) {
                    return (
                        <CommercialCollection
                            collection={collection}
                            salt={salt}
                        />
                    );
                }

                return (
                    <FreeTextCollection collection={collection} salt={salt} />
                );
            case "default":
                if (
                    collection.curated.length === 1 &&
                    collection.collectionType === "slow"
                ) {
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
                    return (
                        <LiveCollection collection={collection} salt={salt} />
                    );
                }

                return (
                    <DefaultCollection collection={collection} salt={salt} />
                );
        }
    });

    return <TableRowCell>{renderedCollections}</TableRowCell>;
};
