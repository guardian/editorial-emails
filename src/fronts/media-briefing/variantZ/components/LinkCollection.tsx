import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import { kickerText } from "../../../../kicker";

export const LinkCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
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
                    {collection.curated.map(story => (
                        <>
                            <HeadlineCard
                                headline={story.header.headline}
                                trailText={story.card.trailText}
                                isComment={story.display.showQuotedHeadline}
                                cardUrl={story.properties.webUrl}
                                pillar={
                                    story.properties.maybeContent
                                        ? story.properties.maybeContent.metadata
                                              .pillar.name
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
                                borderWidth="thin"
                                showUseWhite
                                layout="compact"
                                borderColor="#9fe0c8"
                            />
                        </>
                    ))}
                </TableRowCell>
            </TableRowCell>
        </>
    );
};
