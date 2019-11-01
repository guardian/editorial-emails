import { palette } from "@guardian/src-foundations";
import React from "react";
import { FontCSS, ImageCSS, TableCSS, TdCSS } from "../css";

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
};

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

interface ColumnsProps {
    headline1: string;
    webURL1: string;
    imageURL1?: string;
    imageAlt1?: string;
    headline2: string;
    webURL2: string;
    imageURL2?: string;
    imageAlt2?: string;
}

const GridCell: React.FC<{
    headline: string;
    webURL: string;
    imageURL?: string;
    imageAlt?: string;
}> = ({
    headline,
    webURL,
    imageURL,
    imageAlt
}) => (
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
);

export const Columns: React.FC<ColumnsProps> = ({
    headline1,
    webURL1,
    imageURL1,
    imageAlt1,
    headline2,
    webURL2,
    imageURL2,
    imageAlt2,
}) => (
    <table style={mainTableStyle}>
        <tr>
            <td style={tdStyle}>
                <table style={innerTableStyle}>
                <tr valign="top">
                        <td style={tdColumnStyle}>
                            {imageURL1 && (
                                <GridCell headline={headline1} webURL={webURL1} imageURL={imageURL1} imageAlt={imageAlt1} />
                            )}
                        </td>
                        <td className="gutter">&nbsp;</td>
                        <td style={tdColumnStyle}>
                            {imageURL2 && (
                                <GridCell headline={headline2} webURL={webURL2} imageURL={imageURL2} imageAlt={imageAlt2} />
                            )}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
);
