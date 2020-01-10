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
import { getImageSrc } from "../../../../dataHelpers";

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
        const hasContributor = pair.find(content => {
            const contributor = getContributor(content);
            if (!contributor) {
                return false;
            }

            return contributor.properties.contributorLargeImagePath;
        });

        const contributorLeft = getContributor(pair[0]);
        const contributorLeftImageSrc = contributorLeft
            ? contributorLeft.properties.contributorLargeImagePath
            : null;
        const contributorLeftWrapper = (
            <ContributorImageWrapper
                contributorImageSrc={contributorLeftImageSrc}
                contributorImageAlt=""
            />
        );

        const contributorRight = getContributor(pair[0]);
        const contributorRightImageSrc = contributorRight
            ? contributorRight.properties.contributorLargeImagePath
            : null;
        const contributorRightWrapper = (
            <ContributorImageWrapper
                contributorImageSrc={contributorRightImageSrc}
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
                    left={() => {
                        const content = pair[0];
                        return (
                            <CommentCardB
                                headline={content.header.headline}
                                byline={content.properties.byline}
                                trailText={content.card.trailText}
                                cardUrl={content.properties.webUrl}
                                imageSrc={getImageSrc(content)}
                                imageAlt={content.header.headline}
                                imageRating={content.card.starRating}
                                isComment={content.header.isComment}
                                size="small"
                                shouldShowImage={shouldShowGridImages}
                            />
                        );
                    }}
                    right={() => {
                        const content = pair[1];
                        return (
                            <CommentCardB
                                headline={content.header.headline}
                                byline={content.properties.byline}
                                trailText={content.card.trailText}
                                cardUrl={content.properties.webUrl}
                                imageSrc={getImageSrc(content)}
                                imageAlt={content.header.headline}
                                imageRating={content.card.starRating}
                                isComment={content.header.isComment}
                                size="small"
                                shouldShowImage={shouldShowGridImages}
                            />
                        );
                    }}
                    leftStyles={{ backgroundColor: palette.opinion.faded }}
                    rightStyles={{ backgroundColor: palette.opinion.faded }}
                />
                {hasContributor && (
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
                        cardUrl={pair[0].properties.webUrl}
                        theme="dark"
                    />
                }
                right={
                    pair[1] ? (
                        <LinkCardB
                            headline={pair[1].header.headline}
                            cardUrl={pair[1].properties.webUrl}
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
