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
    width: "100%",
};

const mainTableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
};

const tdStyle: TdCSS = {
    width: "100%",
    paddingBottom: "10px",
};

const tdColumnStyle: TdCSS = {
    width: "49%",
    backgroundColor: palette.culture.faded,
    borderTop: `2px solid ${palette.culture.main}`,
};

const innerTableStyle: TableCSS = {
    borderSpacing: "0",
    borderCollapse: "collapse",
    padding: "0",
    width: "100%",
    position: "relative",
    height: "56px",
}

const metaWrapperStyle: TdCSS = {
    padding: "3px 10px 5px"
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle: FontCSS = {
    color: palette.neutral[7],
    fontFamily: "'Guardian Egyptian Web Headline', Georgia, serif",
    fontSize: "24px",
    lineHeight: "28px",
    fontWeight: 400,
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

export const Columns: React.FC<Props> = ({
    headline,
    webURL,
    imageURL,
    imageAlt
}) => (
    <table style={mainTableStyle}>
        <tr>
            <td style={tdStyle}>
                <table style={innerTableStyle}>
                {imageURL && (
                    <tr valign="top">
                        <td style={tdColumnStyle}>
                            <table style={tableStyle}>
                                <tr valign="top">
                                    <td>
                                        <a href={webURL}>
                                            <img
                                                width="294"
                                                style={imgStyle}
                                                alt={imageAlt}
                                                src={imageURL}
                                            />
                                        </a>
                                    </td>
                                </tr>
                                <tr valign="top">
                                    <td className="h-pad" style={metaWrapperStyle}>
                                        <a style={linkStyle} href={webURL}>
                                            <span className="col-h-sm" style={headlineStyle}>{headline}</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr valign="top">
                                    <td className="col-pad" style={bottomPaddingStyle}></td>
                                </tr>
                            </table>
                        </td>
                        <td className="gutter">&nbsp;</td>
                        <td style={tdColumnStyle}>
                            <table style={tableStyle}>
                                <tr valign="top">
                                    <td>
                                        <a href={webURL}>
                                            <img
                                                width="294"
                                                style={imgStyle}
                                                alt={imageAlt}
                                                src={imageURL}
                                            />
                                        </a>
                                    </td>
                                </tr>
                                <tr valign="top">
                                    <td className="h-pad" style={metaWrapperStyle}>
                                        <a style={linkStyle} href={webURL}>
                                            <span className="col-h-sm" style={headlineStyle}>{headline}</span>
                                        </a>
                                    </td>
                                </tr>
                                <tr valign="top">
                                    <td className="col-pad" style={bottomPaddingStyle}></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                )}
                </table>
            </td>
        </tr>
    </table>
);
