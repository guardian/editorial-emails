import React from "react";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../css";
import { palette } from "@guardian/src-foundations";

const imgStyle: ImageCSS = {
    outline: "none",
    textDecoration: "none",
    maxWidth: "100%",
    clear: "both",
    display: "block",
    border: "0",
    width: "100%"
};

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const innerTableStyle: TableCSS = {
    borderSpacing: "0",
    borderCollapse: "collapse",
    backgroundColor: palette.culture.faded,
    borderTop: `2px solid ${palette.culture.main}`,
    padding: "0",
    width: "100%",
    position: "relative",
    height: "56px"
};

const tdStyle: TdCSS = {
    width: "100%",
    paddingBottom: "10px"
};

const metaWrapperStyle: TdCSS = {
    padding: "3px 65px 5px 12px"
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle: FontCSS = {
    color: palette.neutral[7],
    fontFamily: "'Guardian Egyptian Web Headline', Georgia, serif",
    fontSize: "30px",
    lineHeight: "38px",
    fontWeight: 400
};

const bylineStyle: FontCSS = {
    color: palette.culture.main,
    fontFamily: "'Guardian Egyptian Web Headline Italic', Georgia, serif",
    fontSize: "30px",
    lineHeight: "38px",
    fontStyle: "italic"
};

const bottomPaddingStyle: TdCSS = {
    paddingBottom: "20px"
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
        <tr>
            <td style={tdStyle}>
                <table style={innerTableStyle}>
                    {imageURL && (
                        <tr valign="top">
                            <td style={{ padding: 0 }}>
                                <a href={webURL}>
                                    <img
                                        width="600"
                                        style={imgStyle}
                                        alt={imageAlt}
                                        src={imageURL}
                                    />
                                </a>
                            </td>
                        </tr>
                    )}

                    <tr valign="top">
                        <td className="h-pad" style={metaWrapperStyle}>
                            <a style={linkStyle} href={webURL}>
                                <span className="h-small" style={headlineStyle}>
                                    {headline}
                                </span>
                                <br className="m-hide" />
                                <span className="h-small" style={bylineStyle}>
                                    {" "}
                                    {byline}
                                </span>
                            </a>
                        </td>
                    </tr>

                    <tr valign="top">
                        <td style={bottomPaddingStyle}></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
);
