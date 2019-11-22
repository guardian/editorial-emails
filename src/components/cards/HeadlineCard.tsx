import React from "react";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { kickerText } from "../../kicker";

const fontStyles: FontCSS = {
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    fontSize: "16px",
    lineHeight: "20px"
};

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const tdStyle: TdCSS = {
    backgroundColor: palette.neutral[100],
    borderTop: `2px solid ${palette.culture.main}`,
    padding: "0"
};

const metaWrapperStyle: TdCSS = {
    padding: `3px 10px 5px 10px`
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle: FontCSS = {
    color: palette.neutral[7],
    ...fontStyles,
    fontWeight: 400
};

const kickerStyle: FontCSS = {
    color: palette.culture.main,
    ...fontStyles,
    fontWeight: 400
};

const bylineStyle: FontCSS = {
    color: palette.culture.main,
    ...fontStyles,
    fontStyle: "italic"
};

const bottomPaddingStyle: TdCSS = {
    paddingBottom: "12px"
};

const quoteIconStyle: ImageCSS = {
    height: "0.8em",
    display: "inline-block",
    border: "0"
};

interface Props {
    content: Content;
}

const brazeParameter = "?##braze_utm##";

export const HeadlineCard: React.FC<Props> = ({ content }) => {
    const { headline } = content.header;
    const { byline } = content.properties;
    const webURL = content.properties.webUrl + brazeParameter;
    const isComment = content.display.showQuotedHeadline;

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";

    return (
        <table style={tableStyle}>
            <tr>
                <td style={tdStyle}>
                    <table style={tableStyle}>
                        <tr>
                            <td className="m-pad" style={metaWrapperStyle}>
                                <a style={linkStyle} href={webURL}>
                                    {kicker && (
                                        <span style={kickerStyle}>
                                            {kicker + " / "}
                                        </span>
                                    )}
                                    <span style={headlineStyle}>
                                        {isComment && (
                                            <>
                                                <img
                                                    height={"14"}
                                                    style={quoteIconStyle}
                                                    src="https://assets.guim.co.uk/images/email/icons/9682728db696148fd5a6b149e556df8c/quote-culture.png"
                                                    alt="quote icon"
                                                />{" "}
                                            </>
                                        )}
                                        {headline}
                                    </span>
                                    <br />
                                    <span style={bylineStyle}> {byline}</span>
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    );
};
