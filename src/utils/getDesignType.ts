import { Content } from "../api";

export type DesignType =
    | "default"
    | "comment"
    | "media"
    | "editorial"
    | "link"
    | "film";

export const getDesignType = (content: Content[]): DesignType => {
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
