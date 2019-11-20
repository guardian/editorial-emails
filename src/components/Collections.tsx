import React from "react";
import { Collection as ICollection } from "../api";
import {
    CommentCollection,
    DefaultCollection,
    EditorialCollection,
    MediaCollection,
    LinkCollection
} from "./Collection";
import { Content } from "../api";
import { TableRowCell } from "../layout/Table";

type DesignType = "default" | "comment" | "media" | "editorial" | "link";

const getDesignType = (content: Content[]): DesignType => {
    const designTypes: Set<string> = new Set();
    content.forEach(c => {
        if (c.type === "LinkSnap") {
            designTypes.add("LinkSnap");
        } else {
            designTypes.add(c.card.cardStyle.type);
        }
    });

    if (designTypes.size > 1) {
        return "default";
    }

    switch (designTypes.values().next().value) {
        case "Comment":
            return "comment";
        case "Editorial":
            return "editorial";
        case "Media":
            return "media";
        case "LinkSnap":
            return "link";
        default:
            return "default";
    }
};

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ frontId, collections, salt }) => {
    const res = collections.map(collection => {
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
                return <LinkCollection collection={collection} salt={salt} />;
            case "default":
                return (
                    <DefaultCollection collection={collection} salt={salt} />
                );
        }
    });

    return <TableRowCell>{res}</TableRowCell>;
};
