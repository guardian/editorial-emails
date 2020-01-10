import { Content, Pillar } from "./api";

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
    try {
        const pillarName = story.properties.maybeContent.metadata.pillar.name;
        return pillarName;
    } catch (e) {
        return null;
    }
};

export const getImageSrc = (story: Content): string => {
    try {
        const imageSrc =
            story.properties.maybeContent.trail.trailPicture.allImages[0].url;
        return imageSrc;
    } catch (e) {
        return null;
    }
};
