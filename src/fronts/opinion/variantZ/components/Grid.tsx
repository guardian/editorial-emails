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
import { getImageSrc, getCardUrl } from "../../../../dataHelpers";

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
                        <CommentCardC
                            headline={leftPair.header.headline}
                            byline={leftPair.properties.byline}
                            trailText={leftPair.card.trailText}
                            cardUrl={getCardUrl(leftPair)}
                            imageSrc={getImageSrc(leftPair)}
                            imageAlt={leftPair.header.headline}
                            imageRating={leftPair.card.starRating}
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
                            cardUrl={getCardUrl(rightPair)}
                            imageSrc={getImageSrc(rightPair)}
                            imageAlt={rightPair.header.headline}
                            imageRating={rightPair.card.starRating}
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
}

export const LinkGrid: React.FC<LinkGridProps> = ({ content }) => {
    const rowsArray = partition(content, 2);
    const rows = rowsArray.map((pair, index) => (
        <React.Fragment key={index}>
            <GridRow
                left={
                    <LinkCardC
                        headline={pair[0].header.headline}
                        cardUrl={getCardUrl(pair[0])}
                    />
                }
                right={
                    pair[1] ? (
                        <LinkCardC
                            headline={pair[1].header.headline}
                            cardUrl={getCardUrl(pair[1])}
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
