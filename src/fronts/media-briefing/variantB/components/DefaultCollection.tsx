import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import { kickerText } from "../../../../kicker";

export const DefaultCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const lightGrey = palette.neutral[97];
    const white = palette.neutral[100];

    return (
        <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            {collection.backfill.map((story, index) => (
                <>
                    {index > 0 && <Padding px={4} />}
                    <HeadlineCard
                        headline={story.header.headline}
                        trailText={story.card.trailText}
                        isComment={story.display.showQuotedHeadline}
                        cardUrl={story.properties.webUrl}
                        pillar={
                            story.properties.maybeContent
                                ? story.properties.maybeContent.metadata.pillar
                                      .name
                                : null
                        }
                        byline={
                            story.properties.showByline &&
                            story.properties.byline
                                ? story.properties.byline
                                : ""
                        }
                        kicker={
                            story.header.kicker
                                ? kickerText(story.header.kicker)
                                : ""
                        }
                        backgroundColor={white}
                        showPillarColours
                        borderWidth="thin"
                    />
                </>
            ))}
        </TableRowCell>
    );
};
