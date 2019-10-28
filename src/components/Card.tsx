import React from "react";
import { css } from "../css";
import { palette } from "@guardian/src-foundations";
import { cardPadding } from "../styles/card-padding";
import { textSans } from "../styles/typography";

const styles: css = {
    width: "100%",
    backgroundColor: palette.neutral[20],
    color: palette.neutral[97],
    textAlign: "center",

    ...textSans({ level: 1 })
};

interface Props {
    headline: string;
    byline: string;
    webURL: string;
    imageURL?: string;
    imageAlt?: string;
}

export const Card: React.FC<Props> = ({
    headline,
    byline,
    webURL,
    imageURL,
    imageAlt
}) => (
    <table>
        <tbody>
            {imageURL && (
                <tr>
                    <td>
                        <a href={webURL}>
                            <img alt={imageAlt} src={imageURL} />
                        </a>
                    </td>
                </tr>
            )}

            <tr>
                <td>
                    <a href={webURL}>
                        {headline} / {byline}
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
);
