import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Padding } from "../../../../layout/Padding";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { CommentCardC } from "../../../../components/cards/CommentCardC";
import { Grid as CommentGrid } from "./Grid";
import { getImageSrc, getCardUrl, getByline } from "../../../../dataHelpers";

const frontIdShouldShowCommentGridImages = (frontId: string): boolean => {
    if (frontId === "email/opinion") {
        return false;
    }
    return true;
};

export const CommentCollection: React.FC<{
    frontId: string;
    collection: ICollection;
}> = ({ frontId, collection }) => {
    const content = [].concat(collection.curated).concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const c0 = content[0];
    const c1 = content[1];
    const grid_2_5 = content.slice(2, 6);
    const c6 = content[6];
    const grid_7_8 = content.slice(7, 9);
    const c9 = content[9];

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <CommentCardC
                headline={c0.header.headline}
                byline={getByline(c0)}
                trailText={c0.card.trailText}
                cardUrl={getCardUrl(c0)}
                imageSrc={getImageSrc(c0)}
                imageAlt={c0.header.headline}
                imageRating={c0.card.starRating}
                isComment={c0.header.isComment}
                size="large"
                contributorImageSrc={getImageSrc(c0, { isContributor: true })}
                contributorImageAlt=""
            />
            <Padding px={12} />

            <CommentCardC
                headline={c1.header.headline}
                byline={getByline(c1)}
                trailText={c1.card.trailText}
                cardUrl={getCardUrl(c1)}
                imageSrc={getImageSrc(c1)}
                imageAlt={c1.header.headline}
                imageRating={c1.card.starRating}
                isComment={c1.header.isComment}
                size="large"
                contributorImageSrc={getImageSrc(c1, { isContributor: true })}
                contributorImageAlt=""
            />
            <Padding px={12} />

            <CommentGrid
                content={grid_2_5}
                shouldShowGridImages={frontIdShouldShowCommentGridImages(
                    frontId
                )}
            />

            <CommentCardC
                headline={c6.header.headline}
                byline={getByline(c6)}
                trailText={c6.card.trailText}
                cardUrl={getCardUrl(c6)}
                imageSrc={getImageSrc(c6)}
                imageAlt={c6.header.headline}
                imageRating={c6.card.starRating}
                isComment={c6.header.isComment}
                size="large"
                contributorImageSrc={getImageSrc(c6, { isContributor: true })}
                contributorImageAlt=""
            />
            <Padding px={12} />

            <CommentGrid
                content={grid_7_8}
                shouldShowGridImages={frontIdShouldShowCommentGridImages(
                    frontId
                )}
            />

            <CommentCardC
                headline={c9.header.headline}
                byline={getByline(c9)}
                trailText={c9.card.trailText}
                cardUrl={getCardUrl(c9)}
                imageSrc={getImageSrc(c9)}
                imageAlt={c9.header.headline}
                imageRating={c9.card.starRating}
                isComment={c9.header.isComment}
                contributorImageSrc={getImageSrc(c9, { isContributor: true })}
                contributorImageAlt=""
                size="large"
            />
        </>
    );
};
