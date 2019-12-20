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
    return (
        <a
            href={linkTo}
            style={freeTextStyles}
            dangerouslySetInnerHTML={{
                __html: linkText
            }}
        ></a>
    );
};
