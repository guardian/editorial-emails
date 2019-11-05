import { Kicker } from "./api";

export const kickerText = (kicker: Kicker): string => {
    // TODO implement other kicker types - see
    // https://github.com/guardian/frontend/blob/master/common/app/implicits/ItemKickerImplicits.scala#L40
    // Really this logic should live upstream though
    switch (kicker.type) {
        case "FreeHtmlKicker":
            return kicker.item.properties.kickerText || "";
        default:
            return "";
    }
};
