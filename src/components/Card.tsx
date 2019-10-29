import React from "react";
import { fontCSS, tdCSS, tableCSS, imageCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { headline } from "../styles/typography";

const imgStyle: imageCSS = {
    width: "100%"
};

const tableStyle: tableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    backgroundColor: "rgb(251, 246, 239)",
    borderTop: "2px solid rgb(161, 132, 92)",
    padding: "0",
    width: "100%"
};

const imgWrapperStyle: tdCSS = {
    padding: "0"
};

const metaWrapperStyle: tdCSS = {
    padding: "3px 65px 15px 10px"
};

const linkStyle: fontCSS = {
    textDecoration: "none"
};

const headlineStyle: fontCSS = {
    color: palette.neutral[7],
    ...headline({ level: 4 })
};

const bylineStyle: fontCSS = {
    color: palette.culture.main,
    fontStyle: "italic",

    ...headline({ level: 4 })
};

const bottomPaddingStyle: tdCSS = {
    paddingBottom: "26px",
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
                        <td style={imgWrapperStyle}>
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
