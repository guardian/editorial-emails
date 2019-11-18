import React from "react";
import { Collection as ICollection } from "../api";
import {
    CommentCollection,
    CuratedCollection,
    DefaultCollection,
    EditorialCollection,
    MediaCollection
} from "./Collection";
import { Content } from "../api";
import { TableRowCell } from "../layout/Table";

type DesignType =
    | "default" // backfill
    | "comment" // backfill
    | "media" // backfill
    | "editorial" // backfill
    | "defaultCardStyle"; // Curated

const selectCardStyleFromCollection = (
    content: Content,
    isBackfillContent: boolean
): string => {
    // This function extracts the cardStyle of `content` from both the collection backfill and curated arrays.
    // `content` from collection.backfill has content.cardStyle.type
    // `content` from collection.curated has content.card.cardStyle.type
    if (isBackfillContent) {
        return content.cardStyle.type;
    } else {
        return content.card.cardStyle.type;
    }
};

const getDesignType = (
    content: Content[],
    isBackfillContent: boolean
): DesignType => {
    const cardTypes: Set<string> = new Set();
    content.forEach(c =>
        cardTypes.add(selectCardStyleFromCollection(c, isBackfillContent))
    );

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
        case "DefaultCardstyle":
            return "defaultCardStyle";
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
        // `isBackfillContent` indicates whether the collection was taken from backfill or curated
        // We capture it because there are differences between `content` from backfill and content from curated.
        const [content, isBackfillContent] =
            collection.backfill.length > 0
                ? [collection.backfill, true]
                : [collection.curated, false];

        const designType = getDesignType(content, isBackfillContent);

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
            case "defaultCardStyle":
                return (
                    <CuratedCollection
                        collection={collection}
                        salt={salt}
                        isBackfillContent={isBackfillContent}
                    />
                );
            case "default":
                return (
                    <DefaultCollection collection={collection} salt={salt} />
                );
        }
    });

    return <TableRowCell>{res}</TableRowCell>;
};
