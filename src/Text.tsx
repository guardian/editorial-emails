import { Front } from "./api";
import { getPageTitle } from "./Email";
import { disclaimer } from "./components/Footer";
import { Collection, Content } from "./api";

// The text-only email version
export const Text = (front: Front): string => {
    const getContent = (col: Collection): Content[] => {
        return [].concat(col.backfill, col.curated);
    };

    const pageTitle = getPageTitle(front);

    return `${front.seoData.webTitle} | The Guardian


${front.collections
    .map(collection => {
        return `${collection.displayName}

${getContent(collection)
    .map(
        content =>
            `${content.header.headline}\n${content.properties.webUrl}##braze_utm##`
    )
    .join("\n\n\n")}

`;
    })
    .join("\n")}
Read online: https://www.theguardian.com/${front.id}?##braze_utm##.


${disclaimer(pageTitle)}`;
};
