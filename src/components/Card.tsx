import React from "react";
import { css } from "../css";
import { palette } from "@guardian/src-foundations";
import { headline } from "../styles/typography";

/* const styles: css = {
    width: "100%",
    backgroundColor: palette.neutral[20],
    color: palette.neutral[97],
    textAlign: "center"
}; */

const imgStyle: css = {
    width: "100%"
};

const tableStyle: css = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    backgroundColor: "rgb(251, 246, 239)",
    borderTop: "2px solid rgb(161, 132, 92)",
    padding: "0",
    width: "100%"
};

const imgWrapperStyle: css = {
    padding: "0"
};

const metaWrapperStyle: css = {
    padding: "3px 65px 15px 10px"
};

const linkStyle: css = {
    textDecoration: "none"
};

const headlineStyle: css = {
    color: palette.neutral[7],
    ...headline({ level: 4 })
};

const bylineStyle: css = {
    color: palette.culture.main,
    fontStyle: "italic",

    ...headline({ level: 4 })
};

const bottomPaddingStyle: css = {
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
