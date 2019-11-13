import React from "react";
import { Collection as ICollection } from "../api";
import {
    DefaultCollection,
    MediaCollection,
    CommentCollection
} from "./Collection";
import { Content } from "../api";
import { TableRowCell } from "../layout/Table";

type DesignType = "default" | "comment" | "media";

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
            return "comment";
        case "Media":
            return "media";
        default:
            return "default";
    }
};

export const Collections: React.FC<{
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const res = collections.map(collection => {
        const content = collection.backfill; // TODO support curated too
        const designType = getDesignType(content);

        switch (designType) {
            case "comment":
                return (
                    <CommentCollection collection={collection} salt={salt} />
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
