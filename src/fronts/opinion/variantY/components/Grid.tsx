import React from "react";
import { palette } from "@guardian/src-foundations";
import { TableRowCell, TableRow } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Content } from "../../../../api";
import { GridRow, partition } from "../../../../layout/Grid";
import {
    CommentCardB,
    ContributorImageWrapper
} from "../../../../components/cards/CommentCardB";
import { LinkCardB } from "../../../../components/cards/LinkCardB";
import { getImageSrc, getCardUrl, getByline } from "../../../../dataHelpers";

interface CommentGridProps {
    content: Content[];
    shouldShowGridImages: boolean;
}

export const Grid: React.FC<CommentGridProps> = ({
    content,
    shouldShowGridImages
}) => {
    const rows = partition(content, 2).map((pair, i) => {
        const leftPair = pair[0];
        const contributorLeftWrapper = (
            <ContributorImageWrapper
                contributorImageSrc={getImageSrc(leftPair, {
                    isContributor: true
                })}
                contributorImageAlt=""
            />
        );

        const rightPair = pair[1];
        const contributorRightWrapper = (
            <ContributorImageWrapper
                contributorImageSrc={getImageSrc(rightPair, {
                    isContributor: true
                })}
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
                            byline={getByline(leftPair)}
                            trailText={leftPair.card.trailText}
                            cardUrl={getCardUrl(leftPair)}
                            imageSrc={getImageSrc(leftPair)}
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
                            byline={getByline(rightPair)}
                            trailText={rightPair.card.trailText}
                            cardUrl={getCardUrl(rightPair)}
                            imageSrc={getImageSrc(rightPair)}
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
                        cardUrl={getCardUrl(pair[0])}
                        theme="dark"
                    />
                }
                right={
                    pair[1] ? (
                        <LinkCardB
                            headline={pair[1].header.headline}
                            cardUrl={getCardUrl(pair[1])}
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
