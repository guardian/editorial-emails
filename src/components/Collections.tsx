import React from "react";
import { Collection as ICollection } from "../api";
import {
    CommentCollection,
    DefaultCollection,
    EditorialCollection,
    MediaCollection
} from "./Collection";
import { Content } from "../api";
import { TableRowCell } from "../layout/Table";

type DesignType = "default" | "comment" | "media" | "editorial";

const getDesignType = (content: Content[]): DesignType => {
    const cardTypes: Set<string> = new Set();
    content.forEach(c => cardTypes.add(c.cardStyle.type));

    if (cardTypes.size > 1) {
        return "default";
    }

    switch (cardTypes.values().next().value) {
        case "Comment":
            return "comment";
        case "Editorial":
            return "editorial";
        case "Media":
            return "media";
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
        const content = collection.backfill; // TODO support curated too
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
            case "default":
                return (
                    <DefaultCollection collection={collection} salt={salt} />
                );
        }
    });

    return <TableRowCell>{res}</TableRowCell>;
};
