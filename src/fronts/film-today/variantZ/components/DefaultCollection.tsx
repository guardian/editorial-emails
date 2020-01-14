import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { DefaultGrid } from "../../../../layout/Grid";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import { DescriptiveCard } from "../../../../components/cards/DescriptiveCard";
import { Padding } from "../../../../layout/Padding";
import {
    getKickerText,
    getPillarName,
    getImageSrc,
    getCardUrl,
    getByline
} from "../../../../dataHelpers";

export const DefaultCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated, collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const firstContent = content[0];
    const gridContent = content.slice(1, 5);
    const lastContent = content[5];
    return (
        <>
            <DescriptiveCard
                headline={firstContent.header.headline}
                byline={getByline(firstContent)}
                trailText={firstContent.card.trailText}
                cardUrl={getCardUrl(firstContent)}
                kicker={getKickerText(firstContent)}
                isComment={firstContent.display.showQuotedHeadline}
                pillar={getPillarName(firstContent)}
                imageSrc={getImageSrc(firstContent)}
                imageAlt={firstContent.header.headline}
                imageRating={firstContent.card.starRating}
                showPillarColours
                bodyText={firstContent.properties.maybeContent.fields.body}
            />
            <Multiline />
            <Heading heading="More top stories" />
            {gridContent && <DefaultGrid content={gridContent} />}
            <Padding px={12} />
            <HeadlineCard
                headline={lastContent.header.headline}
                trailText={lastContent.card.trailText}
                isComment={lastContent.display.showQuotedHeadline}
                cardUrl={getCardUrl(lastContent)}
                byline={getByline(lastContent)}
                pillar={getPillarName(lastContent)}
                kicker={getKickerText(lastContent)}
                borderWidth="thick"
                backgroundColor={palette.culture.faded}
            />
        </>
    );
};
