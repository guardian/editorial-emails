import React from "react";
import { palette } from "@guardian/src-foundations";

const freeTextStyles = {
    color: palette.neutral[7],
    textDecoration: "underline"
};

export const FreeTextLink: React.FC<{
    linkTo: string;
    linkText: string;
}> = ({ linkTo, linkText }) => {
    // const brazeParameter = "?##braze_utm##";

    // Append Braze parameter if it's a Guardian URL
    // const isGuardianLink = linkTo.includes("theguardian.com/");
    // const linkHref = isGuardianLink ? linkTo + brazeParameter : linkTo;

    return (
        <a href={linkTo} style={freeTextStyles}>
            {linkText}
        </a>
    );
};
