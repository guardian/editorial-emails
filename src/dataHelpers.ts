import { Content, Pillar } from "./api";

interface getImageSrcParams {
    isCommercial?: boolean;
    isContributor?: boolean;
}

export const getKickerText = (story: Content): string => {
    if (!story.header.kicker) {
        return "";
    }

    switch (story.header.kicker.type) {
        case "FreeHtmlKicker":
            return story.header.kicker.item.properties.kickerText || "";
        case "LiveKicker":
            return "Live";
        default:
            return "";
    }
};

export const getPillarName = (story: Content): Pillar => {
    // All cards
    try {
        const pillarName = story.properties.maybeContent.metadata.pillar.name;
        return pillarName;
    } catch (e) {
        return null;
    }
};

export const getImageSrc = (
    story: Content,
    options: getImageSrcParams = {}
): string => {
    if (options.isCommercial) {
        return story.properties.image.item.imageSrc || null;
    }

    if (options.isContributor) {
        const leadContributor = story.properties.maybeContent.tags.tags.find(
            (tag: any) => {
                return tag.properties.tagType === "Contributor";
            }
        );
        if (!leadContributor) {
            return null;
        }
        return leadContributor.properties.contributorLargeImagePath || null;
    }

    try {
        const imageSrc =
            story.properties.maybeContent.trail.trailPicture.allImages[0].url;
        return imageSrc;
    } catch (e) {
        return null;
    }
};

export const getCardUrl = (story: Content): string => {
    const baseUrl = story.properties.webUrl
        ? story.properties.webUrl
        : `https://www.theguardian.com${story.properties.href}`;

    const brazeParam = "?##braze_utm##";
    return baseUrl + brazeParam;
};

export const getByline = (story: Content): string => {
    if (!story.properties.showByline) {
        return null;
    }

    return story.properties.byline;
};
