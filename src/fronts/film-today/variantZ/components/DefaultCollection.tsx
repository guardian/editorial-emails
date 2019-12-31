import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { DefaultGrid } from "../../../../layout/Grid";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import { DescriptiveCard } from "../../../../components/cards/DescriptiveCard";
import { Padding } from "../../../../layout/Padding";
import { kickerText } from "../../../../kicker";

export const DefaultCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection, salt }) => {
    const firstContent = collection.backfill[0];
    const gridContent = collection.backfill.slice(1, 5);
    const lastContent = collection.backfill[5];

    const kicker = firstContent.header.kicker
        ? kickerText(firstContent.header.kicker)
        : "";

    return (
        <>
            <DescriptiveCard
                headline={firstContent.header.headline}
                byline={
                    firstContent.properties.showByline
                        ? firstContent.header.headline
                        : null
                }
                trailText={firstContent.card.trailText}
                cardUrl={firstContent.properties.webUrl}
                kicker={kicker}
                isComment={firstContent.display.showQuotedHeadline}
                pillar={
                    firstContent.properties.maybeContent
                        ? firstContent.properties.maybeContent.metadata.pillar
                              .name
                        : null
                }
                imageSrc={
                    firstContent.properties.maybeContent.trail.trailPicture
                        .allImages[0].url
                }
                imageAlt={firstContent.header.headline}
                imageSalt={salt}
                imageRating={firstContent.card.starRating}
                showPillarColours
                bodyText={firstContent.properties.maybeContent.fields.body}
            />
            <Multiline />
            <Heading heading="More top stories" />
            {gridContent && <DefaultGrid content={gridContent} salt={salt} />}
            <Padding px={12} />
            <HeadlineCard
                headline={lastContent.header.headline}
                trailText={lastContent.card.trailText}
                isComment={lastContent.display.showQuotedHeadline}
                cardUrl={lastContent.properties.webUrl}
                pillar={
                    lastContent.properties.maybeContent
                        ? lastContent.properties.maybeContent.metadata.pillar
                              .name
                        : null
                }
                byline={
                    lastContent.properties.showByline &&
                    lastContent.properties.byline
                        ? lastContent.properties.byline
                        : ""
                }
                kicker={
                    lastContent.header.kicker
                        ? kickerText(lastContent.header.kicker)
                        : ""
                }
                backgroundColor={palette.culture.faded}
            />
        </>
    );
};
