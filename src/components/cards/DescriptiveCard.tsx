import React from "react";
import sanitizeHtml from "sanitize-html";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../../css";
import { pillarTheme, PillarType } from "../../styles/pillar-themes";
import { sanitizeOptions } from "../../styles/sanitize-options";
import { ContinueButton } from "../buttons/ContinueButton";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { kickerText } from "../../kicker";

const fontFamily = {
    headline: {
        fontFamily: "'GH Guardian Headline', Georgia, serif"
    },
    body: {
        fontFamily: "'Guardian Text Egyptian', Georgia, serif"
    }
};

const fontSizes = {
    large: {
        fontSize: "22px",
        lineHeight: "26px"
    },
    small: {
        fontSize: "16px",
        lineHeight: "20px"
    }
};

const imgStyle: ImageCSS = {
    outline: "none",
    textDecoration: "none",
    maxWidth: "100%",
    clear: "both",
    display: "block",
    border: "0",
    width: "100%",
    fontFamily: "Georgia, serif",
    color: palette.culture.main
};

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const tdStyle: TdCSS = {
    verticalAlign: "top",
    backgroundColor: palette.culture.faded,
    borderTop: `2px solid ${palette.culture.main}`,
    padding: "0"
};

const metaWrapperStyle = {
    padding: `3px 40px 5px 10px`
};

const cellPadding: TdCSS = {
    padding: `6px 10px 10px 10px`
};

const bottomPadding: TdCSS = {
    padding: `6px 10px 20px 10px`
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle = {
    ...fontFamily.headline,
    ...fontSizes.large,
    fontWeight: 400,
    color: palette.neutral[7]
};

const kickerStyle = (pillarColour: string): FontCSS => {
    return {
        ...fontFamily.headline,
        ...fontSizes.large,
        fontWeight: 700,
        color: pillarColour || palette.culture.main
    };
};

const bylineStyle: FontCSS = {
    ...fontFamily.headline,
    ...fontSizes.large,
    fontStyle: "italic",
    color: palette.culture.main
};

const trailTextStyle: FontCSS = {
    ...fontFamily.headline,
    ...fontSizes.small,
    fontWeight: 700
};

const bodyTextStyle: FontCSS = {
    ...fontFamily.body,
    ...fontSizes.small,
    fontWeight: 400
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
    salt: string;
    showByline?: boolean;
    showPillarColours?: boolean;
}

const brazeParameter = "?##braze_utm##";

export const DescriptiveCard: React.FC<Props> = ({
    content,
    salt,
    showByline,
    showPillarColours
}) => {
    const image =
        content.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage = formatImage(
        image.url,
        salt,
        600,
        content.card.starRating
    );

    const { headline } = content.header;
    const { byline } = content.properties;
    const { trailText } = content.card;
    const webURL = content.properties.webUrl + brazeParameter;
    const imageURL = formattedImage;
    const imageAlt = image.fields.altText;
    const isComment = content.display.showQuotedHeadline;

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";

    let pillar: PillarType = {};
    if (showPillarColours && content.properties.maybeContent) {
        const pillarName = content.properties.maybeContent.metadata.pillar.name;
        pillar = pillarTheme[pillarName];
    }

    const bodyText = content.properties.maybeContent.fields.body;
    const bodyParagraphs = bodyText.split("</p>");

    return (
        <table style={tableStyle}>
            <tr>
                <td style={tdStyle}>
                    <table style={tableStyle}>
                        <tr>
                            <td className="m-pad" style={metaWrapperStyle}>
                                <a style={linkStyle} href={webURL}>
                                    {kicker && (
                                        <span
                                            style={kickerStyle(pillar.colour)}
                                        >
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
                                    {showByline && (
                                        <>
                                            <br />
                                            <span style={bylineStyle}>
                                                {byline}
                                            </span>
                                        </>
                                    )}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td
                                className="m-col-pad"
                                style={bottomPaddingStyle}
                            ></td>
                        </tr>
                        {imageURL && (
                            <tr>
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
                        <tr>
                            <td className="m-pad" style={cellPadding}>
                                <span
                                    style={trailTextStyle}
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizeHtml(
                                            trailText,
                                            sanitizeOptions
                                        )
                                    }}
                                />
                            </td>
                        </tr>
                        {bodyParagraphs.map((pText, pIndex) => {
                            if (pIndex < 2) {
                                if (pText) {
                                    return (
                                        <tr key={`tableRow${pIndex}`}>
                                            <td
                                                className="m-pad"
                                                style={cellPadding}
                                            >
                                                <span
                                                    className="bodyText"
                                                    style={bodyTextStyle}
                                                    dangerouslySetInnerHTML={{
                                                        __html: sanitizeHtml(
                                                            pText,
                                                            sanitizeOptions
                                                        )
                                                    }}
                                                ></span>
                                            </td>
                                        </tr>
                                    );
                                }
                            }
                            return null;
                        })}

                        <tr>
                            <td className="m-pad" style={bottomPadding}>
                                <ContinueButton
                                    label="Continue reading"
                                    linkTo={webURL}
                                />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    );
};
