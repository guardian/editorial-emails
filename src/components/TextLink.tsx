import React from "react";
import { palette } from "@guardian/src-foundations";

export const TextLink: React.FC<{
    linkTo: string;
    linkText: string;
}> = ({ linkTo, linkText }) => {
    const brazeParameter = "?##braze_utm##";

    // Append Braze parameter if it's a Guardian URL
    const isGuardianLink = linkTo.includes("theguardian.com/");
    const linkHref = isGuardianLink ? linkTo + brazeParameter : linkTo;

    return (
        <a href={linkHref} style={{ color: palette.neutral[7] }}>
            {linkText}
        </a>
    );
};
