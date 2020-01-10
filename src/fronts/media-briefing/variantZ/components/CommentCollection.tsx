import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { Padding } from "../../../../layout/Padding";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import {
    getKickerText,
    getPillarName,
    getCardUrl,
    getByline
} from "../../../../dataHelpers";

export const CommentCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated).concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const lightGrey = palette.neutral[97];
    const white = palette.neutral[100];
    return (
        <>
            <Padding px={12} backgroundColor={lightGrey} />
            <Multiline />
            <Heading
                heading={collection.displayName}
                backgroundColor={lightGrey}
            />
            {content.map((story, index) => (
                <>
                    {index > 0 && (
                        <Padding px={12} backgroundColor={lightGrey} />
                    )}
                    <HeadlineCard
                        headline={story.header.headline}
                        trailText={story.card.trailText}
                        isComment={story.display.showQuotedHeadline}
                        cardUrl={getCardUrl(story)}
                        pillar={getPillarName(story)}
                        byline={getByline(story)}
                        kicker={getKickerText(story)}
                        backgroundColor={white}
                        showPillarColours
                        borderWidth="thin"
                        layout="expanded"
                    />
                </>
            ))}
        </>
    );
};
