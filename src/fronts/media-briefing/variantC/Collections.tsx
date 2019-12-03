import React from "react";
import { Collection as ICollection } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { getDesignType } from "../../../utils/getDesignType";
import { CommentCollection } from "./components/CommentCollection";
import { LinkCollection } from "./components/LinkCollection";
import { InstagramCollection } from "../../../collections/InstagramCollection";

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
                // TODO - this needs refactoring to improve reliability
                // We need to ignore collections in a more reliable way or otherwise just accept them
                if (collection.displayName === "Media by sector") {
                    return null;
                }

                return (
                    <CommentCollection collection={collection} salt={salt} />
                );
            case "link":
                return <LinkCollection collection={collection} salt={salt} />;
            case "default":
                return (
                    <InstagramCollection collection={collection} salt={salt} />
                );
        }
    });

    return (
        <TableRowCell tdStyle={{ padding: "0" }}>
            {renderedCollections}
        </TableRowCell>
    );
};
