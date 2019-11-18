import React from "react";
import { DefaultCard } from "./DefaultCard";
import { CommentCard } from "./CommentCard";
import { Content } from "../../api";

type CardType = "default" | "comment";

interface CardProps {
    content: Content;
    salt: string;
    size: "large" | "small";
    isBackfillContent: boolean;
}

const cardDisplayType = (c: Content, isBackfillContent: boolean): CardType => {
    const type = isBackfillContent
        ? c.cardStyle.type.toLowerCase()
        : c.card.cardStyle.type.toLowerCase();
    switch (type) {
        case "comment":
            return "comment";
        default:
            return "default";
    }
};

const curatedCardDisplayType = (c: Content): CardType => {
    switch (c.card.cardStyle.type.toLowerCase()) {
        case "comment":
            return "comment";
        default:
            return "default";
    }
};

export const Card: React.FC<CardProps> = ({
    content,
    salt,
    size,
    isBackfillContent
}) => {
    switch (cardDisplayType(content, isBackfillContent)) {
        case "default":
            return (
                <DefaultCard
                    content={content}
                    salt={salt}
                    size={size}
                    isBackfillContent={isBackfillContent}
                />
            );
        case "comment":
            return (
                <CommentCard
                    content={content}
                    salt={salt}
                    size={size}
                    shouldShowImage={true}
                />
            );
    }
};
