import React from "react";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { headline } from "../styles/typography";

const imgStyle: ImageCSS = {
    width: "100%"
};

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    backgroundColor: palette.culture.faded,
    borderTop: "2px solid " + palette.culture.main,
    padding: "0",
    width: "100%"
};

const metaWrapperStyle: TdCSS = {
    padding: "3px 65px 15px 10px"
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle: FontCSS = {
    color: palette.neutral[7],
    ...headline({ level: 4 })
};

const bylineStyle: FontCSS = {
    color: palette.culture.main,
    fontStyle: "italic",

    ...headline({ level: 4 })
};

const bottomPaddingStyle: TdCSS = {
    paddingBottom: "26px"
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
    <table style={tableStyle}>
        <tbody>
            {imageURL && (
                <tr>
                    <td>
                        <a href={webURL}>
                            <img
                                style={imgStyle}
                                alt={imageAlt}
                                src={imageURL}
                            />
                        </a>
                    </td>
                </tr>
            )}

            <tr>
                <td style={metaWrapperStyle}>
                    <a style={linkStyle} href={webURL}>
                        <span style={headlineStyle}>{headline}</span>
                        <br />
                        <span style={bylineStyle}>{byline}</span>
                    </a>
                </td>
            </tr>

            <tr>
                <td style={bottomPaddingStyle}></td>
            </tr>
        </tbody>
    </table>
);
