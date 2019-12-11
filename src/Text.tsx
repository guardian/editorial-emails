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
            `${content.header.headline}\n${content.properties.webUrl}##braze_utm##`
    )
    .join("\n\n\n")}


Read online: https://www.theguardian.com/${front.id}?##braze_utm##.


${disclaimer(pageTitle)}`;
};
