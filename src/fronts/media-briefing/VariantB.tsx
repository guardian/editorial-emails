import React from "react";
import { Collection as ICollection } from "../../api";
import { TableRowCell } from "../../layout/Table";
import { getDesignType } from "../../utils/getDesignType";
import { TopCollection } from "./collections/mediaB/TopCollection";
import { CommentCollection } from "./collections/mediaB/CommentCollection";
import { LinkCollection } from "./collections/mediaB/LinkCollection";
import { DefaultCollection } from "./collections/mediaB/DefaultCollection";

export const VariantB: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const renderedCollections = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated);
        const designType = getDesignType(content);

        switch (designType) {
            case "comment":
                if (collection.displayName === "Media by sector") {
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
