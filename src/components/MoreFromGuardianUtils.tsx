import React from "react";
import {
    Collection as ICollection,
    Tag,
    Kicker,
    Header,
    Content
} from "../api";
import { Card } from "./cards/Card";
import {
    CommentCard,
    SupplementaryMeta,
    Headline,
    Image
} from "./cards/CommentCard";
import { MediaCard } from "./cards/MediaCard";
import { DefaultGrid, CommentGrid, GridRow } from "../layout/Grid";
import { Padding } from "../layout/Padding";
import { Heading } from "./Heading";
import { Multiline } from "./Multiline";
import { kickerText } from "../kicker";
import { palette } from "@guardian/src-foundations";
import { ContributorImageWrapper } from "../components/cards/CommentCard";
import { TableRow, TableRowCell, RowCell, Table } from "../layout/Table";
import sanitizeHtml from "sanitize-html";
import { formatImage } from "../image";
import { TdCSS, TrCSS, TableCSS } from "../css";
import { string } from "prop-types";

interface CommentGridProps {
    content: Content[];
    salt: string;
    shouldShowGridImages: boolean;
}

interface Props {
    content: Content;
    salt: string;
    size: "large" | "small";
    shouldShowImage: boolean;
}

const brazeParameter = "?##braze_utm##";

function partition<T>(seq: T[], n: number): T[][] {
    // split into groups of two
    // return half-width cards
    const groups = [];
    while (seq.length) {
        groups.push(seq.splice(0, n));
    }

    return groups;
}

const tdStyle: TdCSS = {
    backgroundColor: palette.opinion.faded,
    borderTop: `2px solid ${palette.opinion.main}`,
    padding: "0"
};

const tableStyle: TableCSS = {
    borderCollapse: "collapse",
    borderSpacing: 0
};

export const MoreFromCommentCard: React.FC<Props> = ({
    content,
    salt,
    size,
    shouldShowImage
}) => {
    const image =
        content.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage = formatImage(
        image.url,
        salt,
        size === "large" ? 600 : 300,
        content.card.starRating
    );

    const headline = content.header.headline;
    const byline = content.properties.byline;
    const webURL = content.properties.webUrl + brazeParameter;
    const imageURL = formattedImage;
    const imageAlt = image.fields.altText;
    const isComment = content.header.isComment;

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";

    const contributor = content.properties.maybeContent.tags.tags.find(tag => {
        return tag.properties.tagType === "Contributor";
    });

    const profilePic = contributor
        ? contributor.properties.contributorLargeImagePath
        : null;

    const trailText = sanitizeHtml(content.card.trailText, {
        allowedTags: []
    });

    return (
        <TableRowCell tdStyle={tdStyle}>
            <Table>
                <Headline
                    size={size}
                    linkURL={webURL}
                    isComment={isComment}
                    kicker={kicker}
                    headline={headline}
                    byline={byline}
                />

                {size === "large" && (
                    <SupplementaryMeta
                        salt={salt}
                        trailText={trailText}
                        linkURL={webURL}
                        contributorImageSrc={profilePic}
                        contributirImageAlt={contributor.properties.webTitle}
                        size={size}
                        width={size === "large" ? 180 : 147}
                    />
                )}
            </Table>
        </TableRowCell>
    );
};

export const MoreFromCommentGrid: React.FC<CommentGridProps> = ({
    content,
    salt,
    shouldShowGridImages
}) => {
    const rows = partition(content, 2).map((pair, i) => (
        <React.Fragment key={i}>
            <GridRow
                left={
                    <MoreFromCommentCard
                        content={pair[0]}
                        salt={salt}
                        size={"small"}
                        shouldShowImage={shouldShowGridImages}
                    />
                }
                right={
                    <MoreFromCommentCard
                        content={pair[1]}
                        salt={salt}
                        size={"small"}
                        shouldShowImage={shouldShowGridImages}
                    />
                }
                bgdColour={palette.opinion.faded}
            />
            <GridRow
                left={<ContributorImageWrapper content={pair[0]} salt={salt} />}
                right={
                    <ContributorImageWrapper content={pair[1]} salt={salt} />
                }
                bgdColour={palette.opinion.faded}
                align="right"
                valign="bottom"
            />

            <Padding px={10} />
        </React.Fragment>
    ));

    return <table style={tableStyle}>{rows}</table>;
};

export const moreFromGuardianContent = (
    headline: string,
    targetUrl: string
): Content => {
    const allimages = [
        {
            url:
                "https://i.guim.co.uk/img/media/52352f57ae391c8be24fb2cb8afcb92757b29553/0_348_3504_2103/master/3504.jpg?quality=45&sharpen=a0.8,r1,t1&width=300&dpr=2&fit=max&s=6d9fc551c91cecc6aeb0523e328c2f53",
            fields: { altText: "" }
        }
    ];
    const ts: Tag[] = [
        {
            properties: {
                tagType: "Contributor"
            }
        }
    ];

    const innerContent1 = {
        trail: {
            trailPicture: {
                allImages: allimages
            }
        },
        tags: {
            tags: ts
        },
        fields: {
            standfirst: ""
        }
    };

    const properties1 = {
        byline: "",
        webTitle: "", // What is that ?
        webUrl: targetUrl,
        maybeContent: innerContent1
    };

    const card1 = {
        id: "", // What is that ?
        trailText: "" // What is that ?
    };

    return {
        properties: properties1,
        card: card1,
        header: {
            headline,
            isComment: false
        },

        cardStyle: {
            type: "cardStyleType"
        }
    };
};

export const moreFromGuardianICollection = (): ICollection => {
    const icontents = [
        moreFromGuardianContent(
            "Editorials: Get the Guardian View",
            "https://www.theguardian.com/tone/editorials"
        ),
        moreFromGuardianContent(
            "Everything published today",
            "https://www.theguardian.com/commentisfree/all"
        )
    ];
    return {
        id: "", // What is that ?
        displayName: "", // What is that ?
        backfill: icontents
    };
};
