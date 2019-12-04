import { Content } from "../api";

export type DesignType =
    | "default"
    | "comment"
    | "media"
    | "editorial"
    | "link"
    | "film";

export const shouldIgnoreCollection = (content: Content[]): DesignType => {
    return "default";
};
