import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { CommentCardB } from "../../../../components/cards/CommentCardB";
import { Padding } from "../../../../layout/Padding";
import { Content, Tag } from "../../../../api";
import { Grid as CommentGrid } from "./Grid";

const frontIdShouldShowCommentGridImages = (frontId: string): boolean => {
    if (frontId === "email/opinion") {
        return false;
    }
    return true;
};

const getContributor = (content: Content): Tag => {
    return content.properties.maybeContent.tags.tags.find(tag => {
        return tag.properties.tagType === "Contributor";
    });
};

export const CommentCollection: React.FC<{
    frontId: string;
    collection: ICollection;
    salt: string;
}> = ({ frontId, collection, salt }) => {
    // TODO handle curated collections

    const c0 = collection.backfill[0];
    const c1 = collection.backfill[1];
    const grid_2_5 = collection.backfill.slice(2, 6);
    const c6 = collection.backfill[6];
    const grid_7_8 = collection.backfill.slice(7, 9);
    const c9 = collection.backfill[9];

    const c0Contributor = getContributor(c0);
    const c1Contributor = getContributor(c1);
    const c6Contributor = getContributor(c6);
    const c9Contributor = getContributor(c9);

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <CommentCardB
                headline={c0.header.headline}
                byline={c0.properties.byline}
                trailText={c0.card.trailText}
                cardUrl={c0.properties.webUrl}
                imageSrc={
                    c0.properties.maybeContent
                        ? c0.properties.maybeContent.trail.trailPicture
                              .allImages[0].url
                        : null
                }
                imageAlt={c0.header.headline}
                imageRating={c0.card.starRating}
                imageSalt={salt}
                isComment={c0.header.isComment}
                size="large"
                contributorImageSrc={
                    c0Contributor
                        ? c0Contributor.properties.contributorLargeImagePath
                        : null
                }
                contributorImageAlt={
                    c0Contributor ? c0Contributor.properties.webTitle : null
                }
                shouldShowImage={false}
            />
            <Padding px={12} />

            <CommentCardB
                headline={c1.header.headline}
                byline={c1.properties.byline}
                trailText={c1.card.trailText}
                cardUrl={c1.properties.webUrl}
                imageSrc={
                    c1.properties.maybeContent
                        ? c1.properties.maybeContent.trail.trailPicture
                              .allImages[0].url
                        : null
                }
                imageAlt={c1.header.headline}
                imageRating={c1.card.starRating}
                imageSalt={salt}
                isComment={c1.header.isComment}
                size="large"
                contributorImageSrc={
                    c1Contributor
                        ? c1Contributor.properties.contributorLargeImagePath
                        : null
                }
                contributorImageAlt={
                    c1Contributor ? c1Contributor.properties.webTitle : null
                }
                shouldShowImage={false}
            />
            <Padding px={12} />

            <CommentGrid
                content={grid_2_5}
                salt={salt}
                shouldShowGridImages={frontIdShouldShowCommentGridImages(
                    frontId
                )}
            />

            <CommentCardB
                headline={c6.header.headline}
                byline={c6.properties.byline}
                trailText={c6.card.trailText}
                cardUrl={c6.properties.webUrl}
                imageSrc={
                    c6.properties.maybeContent
                        ? c6.properties.maybeContent.trail.trailPicture
                              .allImages[0].url
                        : null
                }
                imageAlt={c6.header.headline}
                imageRating={c6.card.starRating}
                imageSalt={salt}
                isComment={c6.header.isComment}
                size="large"
                contributorImageSrc={
                    c6Contributor
                        ? c6Contributor.properties.contributorLargeImagePath
                        : null
                }
                contributorImageAlt={
                    c6Contributor ? c6Contributor.properties.webTitle : null
                }
                shouldShowImage={false}
            />
            <Padding px={12} />

            <CommentGrid
                content={grid_7_8}
                salt={salt}
                shouldShowGridImages={frontIdShouldShowCommentGridImages(
                    frontId
                )}
            />

            <CommentCardB
                headline={c9.header.headline}
                byline={c9.properties.byline}
                trailText={c9.card.trailText}
                cardUrl={c9.properties.webUrl}
                imageSrc={
                    c9.properties.maybeContent
                        ? c9.properties.maybeContent.trail.trailPicture
                              .allImages[0].url
                        : null
                }
                imageAlt={c9.header.headline}
                imageRating={c9.card.starRating}
                imageSalt={salt}
                isComment={c9.header.isComment}
                size="large"
                contributorImageSrc={
                    c9Contributor
                        ? c9Contributor.properties.contributorLargeImagePath
                        : null
                }
                contributorImageAlt={
                    c9Contributor ? c9Contributor.properties.webTitle : null
                }
                shouldShowImage={false}
            />
        </>
    );
};
