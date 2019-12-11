import React from "react";
import sanitizeHtml from "sanitize-html";
import { FontCSS, TdCSS, TableCSS } from "../../css";
import { sanitizeOptions } from "../../utils/sanitizeOptions";
import { ContinueButton } from "../buttons/ContinueButton";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { kickerText } from "../../kicker";
import { Headline } from "../../components/Headline";
import { Image } from "../../components/Image";
import { headline, textBody } from "../../styles/typography";
import { Table, RowCell, TableRowCell } from "../../layout/Table";

const tdStyle: TdCSS = {
    verticalAlign: "top",
    backgroundColor: palette.culture.faded,
    borderTop: `2px solid ${palette.culture.main}`
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

const trailTextStyle: FontCSS = {
    ...headline({ level: 1, fontWeight: "bold" })
};

const bodyTextStyle: FontCSS = {
    ...textBody({ level: 1, lineHeight: "regular" })
};

const bottomPaddingStyle: TdCSS = {
    paddingBottom: "12px"
};

interface Props {
    content: Content;
    salt: string;
    showPillarColours?: boolean;
}

const brazeParameter = "?##braze_utm##";

export const DescriptiveCard: React.FC<Props> = ({
    content,
    salt,
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
    const { trailText } = content.card;
    const webURL = content.properties.webUrl + brazeParameter;
    const imageURL = formattedImage;
    const imageAlt = content.header.headline;
    const showQuotation = content.display.showQuotedHeadline;

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";

    const pillar = content.properties.maybeContent
        ? content.properties.maybeContent.metadata.pillar.name
        : null;

    const { showByline } = content.properties;
    const byline =
        showByline && content.properties.byline
            ? content.properties.byline
            : "";

    const bodyText = content.properties.maybeContent.fields.body;
    const bodyParagraphs = bodyText.split("</p>");

    return (
        <TableRowCell tdStyle={tdStyle}>
            <Table>
                <tr>
                    <td className="m-pad" style={metaWrapperStyle}>
                        <Headline
                            text={headline}
                            linkTo={webURL}
                            size="large"
                            pillar={showPillarColours ? pillar : null}
                            kicker={kicker}
                            byline={byline}
                            showQuotation={showQuotation}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="m-col-pad" style={bottomPaddingStyle}></td>
                </tr>
                {imageURL && (
                    <RowCell>
                        <Image
                            width={600}
                            alt={imageAlt}
                            src={imageURL}
                            linkTo={webURL}
                            pillar={pillar}
                        />
                    </RowCell>
                )}
                <tr>
                    <td className="m-pad" style={cellPadding}>
                        <span
                            style={trailTextStyle}
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(trailText, sanitizeOptions)
                            }}
                        />
                    </td>
                </tr>
                {bodyParagraphs.map((pText, pIndex) => {
                    if (pIndex < 2) {
                        if (pText) {
                            return (
                                <tr key={`tableRow${pIndex}`}>
                                    <td className="m-pad" style={cellPadding}>
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
            </Table>
        </TableRowCell>
    );
};
