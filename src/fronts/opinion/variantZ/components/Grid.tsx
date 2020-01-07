import React from "react";
import { palette } from "@guardian/src-foundations";
import { TableRow, TableRowCell } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Content, Tag } from "../../../../api";
import { GridRow, partition } from "../../../../layout/Grid";
import {
    CommentCardC,
    ContributorImageWrapper
} from "../../../../components/cards/CommentCardC";
import { LinkCardC } from "../../../../components/cards/LinkCardC";

interface CommentGridProps {
    content: Content[];
    salt: string;
    shouldShowGridImages: boolean;
}

const getContributor = (content: Content): Tag => {
    return content.properties.maybeContent.tags.tags.find(tag => {
        return tag.properties.tagType === "Contributor";
    });
};

export const Grid: React.FC<CommentGridProps> = ({
    content,
    salt,
    shouldShowGridImages
}) => {
    const rows = partition(content, 2).map((pair, i) => {
        const leftPair = pair[0];
        const leftContributor = getContributor(leftPair);
        const leftContributorImg = leftContributor
            ? leftContributor.properties.contributorLargeImagePath
            : null;
        const contributorLeftWrapper = (
            <ContributorImageWrapper
                contributorImageSrc={leftContributorImg}
                contributorImageAlt=""
                imageSalt={salt}
            />
        );

        const rightPair = pair[1];
        const rightContributor = getContributor(rightPair);
        const rightContributorImg = rightContributor
            ? rightContributor.properties.contributorLargeImagePath
            : null;
        const contributorRightWrapper = (
            <ContributorImageWrapper
                contributorImageSrc={rightContributorImg}
                contributorImageAlt=""
                imageSalt={salt}
            />
        );

        const contributor = (node: React.ReactNode): React.ReactNode => (
            <TableRow>
                <td style={{ width: "50%", padding: "0" }}></td>
                <td style={{ width: "50%", padding: "0" }}>{node}</td>
            </TableRow>
        );

        return (
            <React.Fragment key={i}>
                <GridRow
                    left={
                        <CommentCardC
                            headline={leftPair.header.headline}
                            byline={leftPair.properties.byline}
                            trailText={leftPair.card.trailText}
                            cardUrl={leftPair.properties.webUrl}
                            imageSrc={
                                leftPair.properties.maybeContent
                                    ? leftPair.properties.maybeContent.trail
                                          .trailPicture.allImages[0].url
                                    : null
                            }
                            imageAlt={leftPair.header.headline}
                            imageRating={leftPair.card.starRating}
                            imageSalt={salt}
                            isComment={leftPair.header.isComment}
                            size="small"
                            shouldShowImage={shouldShowGridImages}
                        />
                    }
                    right={
                        <CommentCardC
                            headline={rightPair.header.headline}
                            byline={rightPair.properties.byline}
                            trailText={rightPair.card.trailText}
                            cardUrl={rightPair.properties.webUrl}
                            imageSrc={
                                rightPair.properties.maybeContent
                                    ? rightPair.properties.maybeContent.trail
                                          .trailPicture.allImages[0].url
                                    : null
                            }
                            imageAlt={rightPair.header.headline}
                            imageRating={rightPair.card.starRating}
                            imageSalt={salt}
                            isComment={rightPair.header.isComment}
                            size="small"
                            shouldShowImage={shouldShowGridImages}
                        />
                    }
                    leftStyles={{
                        backgroundColor: palette.neutral[100],
                        borderLeft: `1px solid ${palette.opinion.main}`
                    }}
                    rightStyles={{
                        backgroundColor: palette.neutral[100],
                        borderLeft: `1px solid ${palette.opinion.main}`
                    }}
                />
                {leftPair || rightPair ? (
                    <GridRow
                        left={contributor(contributorLeftWrapper)}
                        right={contributor(contributorRightWrapper)}
                        leftStyles={{
                            backgroundColor: palette.neutral[100],
                            verticalAlign: "bottom",
                            borderLeft: `1px solid ${palette.opinion.main}`,
                            borderBottom: `1px solid ${palette.opinion.main}`
                        }}
                        rightStyles={{
                            backgroundColor: palette.neutral[100],
                            verticalAlign: "bottom",
                            borderLeft: `1px solid ${palette.opinion.main}`,
                            borderBottom: `1px solid ${palette.opinion.main}`
                        }}
                    />
                ) : (
                    <GridRow
                        left="&nbsp;"
                        right="&nbsp;"
                        leftStyles={{
                            backgroundColor: palette.neutral[100],
                            verticalAlign: "bottom",
                            borderLeft: `1px solid ${palette.opinion.main}`,
                            borderBottom: `1px solid ${palette.opinion.main}`,
                            lineHeight: "0"
                        }}
                        rightStyles={{
                            backgroundColor: palette.neutral[100],
                            verticalAlign: "bottom",
                            borderLeft: `1px solid ${palette.opinion.main}`,
                            borderBottom: `1px solid ${palette.opinion.main}`,
                            lineHeight: "0"
                        }}
                    />
                )}

                <Padding px={12} />
            </React.Fragment>
        );
    });

    return <TableRowCell>{rows}</TableRowCell>;
};

interface LinkGridProps {
    content: Content[];
    salt: string;
}

// TODO really should accept a React element so that it doesn't have to know
// about Card or salt.
export const LinkGrid: React.FC<LinkGridProps> = ({ content, salt }) => {
    const rowsArray = partition(content, 2);
    const rows = rowsArray.map((pair, index) => (
        <React.Fragment key={index}>
            <GridRow
                left={
                    <LinkCardC
                        headline={pair[0].header.headline}
                        cardUrl={pair[0].properties.href}
                    />
                }
                right={
                    pair[1] ? (
                        <LinkCardC
                            headline={pair[1].header.headline}
                            cardUrl={pair[1].properties.href}
                        />
                    ) : null
                }
                leftStyles={{
                    backgroundColor: palette.neutral[100],
                    borderLeft: `1px solid ${palette.neutral[20]}`,
                    borderBottom: `1px solid ${palette.neutral[20]}`
                }}
                rightStyles={{
                    backgroundColor: palette.neutral[100],
                    borderLeft: `1px solid ${palette.neutral[20]}`,
                    borderBottom: `1px solid ${palette.neutral[20]}`
                }}
            />
            {index < rowsArray.length - 1 && <Padding px={12} />}
        </React.Fragment>
    ));

    return <TableRowCell>{rows}</TableRowCell>;
};
