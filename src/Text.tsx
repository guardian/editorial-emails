import { Front } from "./api";

// The text-only email version
export const Text = (front: Front): string => {
    const collection = front.collections[0];

    return `${front.seoData.webTitle} | The Guardian


${collection.displayName}


${collection.backfill
    .map(
        content =>
            `${content.properties.webTitle}\n${content.properties.webUrl}\n\n\n`
    )
    .join("")}`;
};
