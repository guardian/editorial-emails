import { Content } from "./api";

export const getKickerText = (story: Content): string => {
    if (!story.header.kicker) {
        return "";
    }

    // TODO implement other kicker types - see
    // https://github.com/guardian/frontend/blob/master/common/app/implicits/ItemKickerImplicits.scala#L40
    // Really this logic should live upstream though
    switch (story.header.kicker.type) {
        case "FreeHtmlKicker":
            return story.header.kicker.item.properties.kickerText || "";
        case "LiveKicker":
            return "Live";
        default:
            return "";
    }
};
