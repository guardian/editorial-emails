import React from "react";
import sanitizeHtml from "sanitize-html";
import { FontCSS, TdCSS, TableCSS } from "../../css";
import { sanitizeOptions } from "../../utils/sanitizeOptions";
import { ContinueButton } from "../ContinueButton";
import { palette } from "@guardian/src-foundations";
import { Pillar } from "../../api";
import { Headline } from "../../components/Headline";
import { Image } from "../../components/Image";
import { pillarProps } from "../../utils/pillarProps";
import { headline, textBody } from "../../styles/typography";
import { Table, RowCell, TableRowCell } from "../../layout/Table";

const tdStyle = (showPillarColours: boolean, pillar: string): TdCSS => {
    if (showPillarColours && pillar && pillarProps[pillar]) {
        return {
            verticalAlign: "top",
            backgroundColor: pillarProps[pillar].faded,
            borderTop: `2px solid ${pillarProps[pillar].colour}`
        };
    }
    return {
        verticalAlign: "top",
        backgroundColor: palette.culture.faded,
        borderTop: `2px solid ${palette.culture.main}`
    };
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
    headline: string;
    byline: string;
    trailText?: string;
    bodyText: string;
    kicker?: string;
    pillar?: Pillar;
    isComment?: boolean;
    cardUrl: string;
    showPillarColours?: boolean;
    imageSrc?: string;
    imageAlt?: string;
    imageRating?: number;
}

export const DescriptiveCard: React.FC<Props> = ({
    headline,
    byline,
    trailText,
    bodyText,
    cardUrl,
    kicker,
    isComment = false,
    pillar,
    imageSrc,
    imageAlt,
    imageRating,
    showPillarColours
}) => {
    const bodyPars = bodyText.split("</p>");
    return (
        <TableRowCell tdStyle={tdStyle(showPillarColours, pillar)}>
            <Table>
                <tr>
                    <td className="m-pad" style={metaWrapperStyle}>
                        <Headline
                            text={headline}
                            linkTo={cardUrl}
                            size="large"
                            pillar={showPillarColours ? pillar : null}
                            kicker={kicker}
                            byline={byline}
                            showQuotation={isComment}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="m-col-pad" style={bottomPaddingStyle}></td>
                </tr>
                {imageSrc && (
                    <RowCell>
                        <Image
                            width={600}
                            alt={imageAlt}
                            src={imageSrc}
                            rating={imageRating}
                            linkTo={cardUrl}
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
                {bodyPars.map((pText, pIndex) => {
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
                            linkTo={cardUrl}
                        />
                    </td>
                </tr>
            </Table>
        </TableRowCell>
    );
};
