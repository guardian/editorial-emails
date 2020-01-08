import React from "react";
import { palette } from "@guardian/src-foundations";
import { TableRowCell, TableRow } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Content, Tag } from "../../../../api";
import { GridRow, partition } from "../../../../layout/Grid";
import {
    CommentCardB,
    ContributorImageWrapper
} from "../../../../components/cards/CommentCardB";
import { LinkCardB } from "../../../../components/cards/LinkCardB";

interface CommentGridProps {
    content: Content[];
    shouldShowGridImages: boolean;
}

const getContributor = (content: Content): Tag => {
    return content.properties.maybeContent.tags.tags.find(tag => {
        return tag.properties.tagType === "Contributor";
    });
};

export const Grid: React.FC<CommentGridProps> = ({
    content,
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
                        <CommentCardB
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
                            isComment={leftPair.header.isComment}
                            size={"small"}
                            shouldShowImage={shouldShowGridImages}
                        />
                    }
                    right={
                        <CommentCardB
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
                            isComment={rightPair.header.isComment}
                            size={"small"}
                            shouldShowImage={shouldShowGridImages}
                        />
                    }
                    leftStyles={{ backgroundColor: palette.opinion.faded }}
                    rightStyles={{ backgroundColor: palette.opinion.faded }}
                />
                {(leftPair || rightPair) && (
                    <GridRow
                        left={contributor(contributorLeftWrapper)}
                        right={contributor(contributorRightWrapper)}
                        leftStyles={{
                            backgroundColor: palette.opinion.faded,
                            verticalAlign: "bottom"
                        }}
                        rightStyles={{
                            backgroundColor: palette.opinion.faded,
                            verticalAlign: "bottom"
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
}

export const LinkGrid: React.FC<LinkGridProps> = ({ content }) => {
    const rowsArray = partition(content, 2);
    const rows = rowsArray.map((pair, index) => (
        <React.Fragment key={index}>
            <GridRow
                left={
                    <LinkCardB
                        headline={pair[0].header.headline}
                        cardUrl={pair[0].properties.href}
                        theme="dark"
                    />
                }
                right={
                    pair[1] ? (
                        <LinkCardB
                            headline={pair[1].header.headline}
                            cardUrl={pair[1].properties.href}
                            theme="light"
                        />
                    ) : null
                }
                leftStyles={{
                    backgroundColor: palette.neutral[20]
                }}
                rightStyles={{
                    backgroundColor: palette.neutral[86]
                }}
            />
            {index < rowsArray.length - 1 && <Padding px={12} />}
        </React.Fragment>
    ));

    return <TableRowCell>{rows}</TableRowCell>;
};
