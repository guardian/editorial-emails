import { Front } from "./api";
import { getPageTitle } from "./Email";
import { disclaimer } from "./components/Footer";

// The text-only email version
export const Text = (front: Front): string => {
    const pageTitle = getPageTitle(front);
    const collection = front.collections[0];

    return `${front.seoData.webTitle} | The Guardian


${collection.displayName}


${collection.backfill
    .map(
        content =>
            `${content.properties.webTitle}\n${content.properties.webUrl}`
    )
    .join("\n\n\n")}


${disclaimer(pageTitle)}`;
};
