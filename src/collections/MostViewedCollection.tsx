import React from "react";
import { Collection as ICollection } from "../api";
import { TableRowCell } from "../layout/Table";
import { Heading } from "../components/Heading";
import { Padding } from "../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../components/Multiline";
import { MostViewedCard } from "../components/cards/MostViewedCard";
import {
    getKickerText,
    getPillarName,
    getCardUrl,
    getByline
} from "../dataHelpers";

export const MostViewedCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated, collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const lightGrey = palette.neutral[97];
    return (
        <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
            <Padding px={12} />
            <Multiline />
            <Heading heading={collection.displayName} />
            {content.slice(0, 10).map((story, index) => (
                <>
                    <MostViewedCard
                        headline={story.header.headline}
                        cardUrl={getCardUrl(story)}
                        isComment={story.display.showQuotedHeadline}
                        pillar={getPillarName(story)}
                        byline={getByline(story)}
                        kicker={getKickerText(story)}
                        index={String(index + 1)}
                    />
                    {index < content.length - 1 && (
                        <Padding px={6} backgroundColor={lightGrey} />
                    )}
                </>
            ))}
        </TableRowCell>
    );
};
