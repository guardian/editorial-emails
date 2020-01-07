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
        const hasContributor = pair.find(content => {
            const contributor = getContributor(content);
            if (!contributor) {
                return false;
            }

            return contributor.properties.contributorLargeImagePath;
        });

        const pair0Contributor = getContributor(pair[0]);
        const pair0ContributorImg = pair0Contributor
            ? pair0Contributor.properties.contributorLargeImagePath
            : null;
        const contributorLeftWrapper = (
            <ContributorImageWrapper
                contributorImageSrc={pair0ContributorImg}
                contributorImageAlt=""
                imageSalt={salt}
            />
        );

        const pair1Contributor = getContributor(pair[1]);
        const pair1ContributorImg = pair1Contributor
            ? pair1Contributor.properties.contributorLargeImagePath
            : null;
        const contributorRightWrapper = (
            <ContributorImageWrapper
                contributorImageSrc={pair1ContributorImg}
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
                        <CommentCardB
                            headline={pair[0].header.headline}
                            byline={pair[0].properties.byline}
                            trailText={pair[0].card.trailText}
                            cardUrl={pair[0].properties.webUrl}
                            imageSrc={
                                pair[0].properties.maybeContent
                                    ? pair[0].properties.maybeContent.trail
                                          .trailPicture.allImages[0].url
                                    : null
                            }
                            imageAlt={pair[0].header.headline}
                            imageRating={pair[0].card.starRating}
                            imageSalt={salt}
                            isComment={pair[0].header.isComment}
                            size={"small"}
                            shouldShowImage={shouldShowGridImages}
                        />
                    }
                    right={
                        <CommentCardB
                            headline={pair[1].header.headline}
                            byline={pair[1].properties.byline}
                            trailText={pair[1].card.trailText}
                            cardUrl={pair[1].properties.webUrl}
                            imageSrc={
                                pair[1].properties.maybeContent
                                    ? pair[1].properties.maybeContent.trail
                                          .trailPicture.allImages[0].url
                                    : null
                            }
                            imageAlt={pair[1].header.headline}
                            imageRating={pair[1].card.starRating}
                            imageSalt={salt}
                            isComment={pair[1].header.isComment}
                            size={"small"}
                            shouldShowImage={shouldShowGridImages}
                        />
                    }
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
