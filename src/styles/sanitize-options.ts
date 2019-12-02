import sanitizeHtml from "sanitize-html";
import { palette } from "@guardian/src-foundations";

// Strip HTML tags but preserve <a> tags
// Transform <a> tags to allow an HREF and a style attrbute
export const sanitizeOptions = {
    allowedTags: ["a"],
    allowedAttributes: {
        a: ["href", "style"]
    },
    transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
            style: `color: ${palette.culture.main};`
        })
    }
};
