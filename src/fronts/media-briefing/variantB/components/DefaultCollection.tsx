import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import {
    getKickerText,
    getPillarName,
    getCardUrl
} from "../../../../dataHelpers";

export const DefaultCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated).concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const lightGrey = palette.neutral[97];
    const white = palette.neutral[100];
    return (
        <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            {content.map((story, index) => (
                <>
                    {index > 0 && <Padding px={4} />}
                    <HeadlineCard
                        headline={story.header.headline}
                        trailText={story.card.trailText}
                        isComment={story.display.showQuotedHeadline}
                        cardUrl={getCardUrl(story)}
                        byline={
                            story.properties.showByline &&
                            story.properties.byline
                                ? story.properties.byline
                                : ""
                        }
                        pillar={getPillarName(story)}
                        kicker={getKickerText(story)}
                        backgroundColor={white}
                        showPillarColours
                        borderWidth="thin"
                    />
                </>
            ))}
        </TableRowCell>
    );
};
