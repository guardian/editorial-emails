import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import {
    getKickerText,
    getPillarName,
    getCardUrl,
    getByline
} from "../../../../dataHelpers";

export const LinkCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated, collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const lightGrey = palette.neutral[97];
    const marineBlue = "#00A194";
    return (
        <>
            <Padding px={12} backgroundColor={lightGrey} />
            <TableRowCell
                tdStyle={{
                    backgroundColor: marineBlue,
                    padding: "8px 0 10px 0"
                }}
            >
                <Heading
                    heading={collection.displayName}
                    color={palette.neutral[100]}
                />
                <TableRowCell tdStyle={{ padding: "0 10px" }}>
                    {content.map(story => (
                        <HeadlineCard
                            headline={story.header.headline}
                            trailText={story.card.trailText}
                            isComment={story.display.showQuotedHeadline}
                            cardUrl={getCardUrl(story)}
                            byline={getByline(story)}
                            pillar={getPillarName(story)}
                            kicker={getKickerText(story)}
                            borderWidth="thin"
                            showUseWhite
                            layout="compact"
                            borderColor="#9fe0c8"
                        />
                    ))}
                </TableRowCell>
            </TableRowCell>
        </>
    );
};
