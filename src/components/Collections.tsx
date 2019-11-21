import React from "react";
import { Collection as ICollection } from "../api";
import { DefaultCollection, LinkCollection } from "./Collection";
import {
    Collection as CommentCollectionB,
    EditorialCollection as EditorialCollectionB,
    MediaCollection as MediaCollectionB
} from "./tests/commentB/Collection";
import {
    Collection as CommentCollectionC,
    EditorialCollection as EditorialCollectionC,
    MediaCollection as MediaCollectionC
} from "./tests/commentC/Collection";
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
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
    const res = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated); // TODO support curated too
        const designType = getDesignType(content);

        if (collection.displayName === "Save 50% for three months") {
            return null; // ignore the jobs collection for now
        }

        switch (designType) {
            case "editorial":
                if (variant === "c") {
                    return (
                        <EditorialCollectionC
                            collection={collection}
                            salt={salt}
                        />
                    );
                }

                return (
                    <EditorialCollectionB collection={collection} salt={salt} />
                );
            case "comment":
                if (variant === "c") {
                    return (
                        <CommentCollectionC
                            frontId={frontId}
                            collection={collection}
                            salt={salt}
                        />
                    );
                }

                return (
                    <CommentCollectionB
                        frontId={frontId}
                        collection={collection}
                        salt={salt}
                    />
                );
            case "media":
                if (variant === "c") {
                    return (
                        <MediaCollectionC collection={collection} salt={salt} />
                    );
                }

                return <MediaCollectionB collection={collection} salt={salt} />;

            case "link":
                return (
                    <LinkCollection
                        collection={collection}
                        salt={salt}
                        variant={variant}
                    />
                );
            case "default":
                return (
                    <DefaultCollection
                        collection={collection}
                        salt={salt}
                        variant={variant}
                    />
                );
        }
    });

    return <TableRowCell>{res}</TableRowCell>;
};
