import React from "react";
import { DefaultCard } from "./DefaultCard";
import { Card as CommentCard } from "../tests/commentB/Card";
import { Content } from "../../api";

type CardType = "default" | "comment";

interface CardProps {
    content: Content;
    salt: string;
    size: "large" | "small";
}

const cardDisplayType = (c: Content): CardType => {
    switch (c.card.cardStyle.type.toLowerCase()) {
        case "comment":
            return "comment";
        default:
            return "default";
    }
};

export const Card: React.FC<CardProps> = ({ content, salt, size }) => {
    switch (cardDisplayType(content)) {
        case "default":
            return <DefaultCard content={content} salt={salt} size={size} />;
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
