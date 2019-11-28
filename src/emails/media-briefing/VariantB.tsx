import React from "react";
import { Collection as ICollection } from "../../api";
import { palette } from "@guardian/src-foundations";
import { OverlayCard } from "../../components/cards/OverlayCard";
import { Multiline } from "../../components/Multiline";
import { Heading } from "../../components/Heading";
import { HeadlineCard } from "../../components/cards/HeadlineCard";
import { Padding } from "../../layout/Padding";
import { TableRowCell } from "../../layout/Table";

export const VariantB: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const leadStory = collections[0].backfill[0];
    const topStories = collections[0].backfill.slice(1);
    const opinionStories = collections[1].backfill;
    const tvRadioStories = collections[2].backfill;
    const jobsStories = collections[3].curated;

    const lightGrey = palette.neutral[97];
    const white = palette.neutral[100];
    const jobsBackground = "#00A194";

    return (
        <>
            <TableRowCell
                tdStyle={{ backgroundColor: lightGrey, padding: "0" }}
            >
                <Multiline topPadding />
                <Heading heading={collections[0].displayName} />

                <OverlayCard
                    content={leadStory}
                    salt={salt}
                    backgroundColor={white}
                    layout="compact"
                />

                <Padding px={12} backgroundColor={palette.neutral[97]} />

                {topStories.map((story, index) => (
                    <>
                        {index > 0 && <Padding px={4} />}
                        <HeadlineCard
                            content={story}
                            backgroundColor={white}
                            showPillarColours
                            borderWidth="thin"
                        />
                    </>
                ))}

                <Multiline topPadding />
                <Heading heading={collections[1].displayName} />
                {opinionStories.map((story, index) => (
                    <>
                        {index > 0 && <Padding px={4} />}
                        <HeadlineCard
                            content={story}
                            backgroundColor={white}
                            showPillarColours
                            borderWidth="thin"
                            layout="expanded"
                        />
                    </>
                ))}

                <Multiline topPadding />
                <Heading heading={collections[2].displayName} />
                {tvRadioStories.map((story, index) => (
                    <>
                        {index > 0 && <Padding px={4} />}
                        <HeadlineCard
                            content={story}
                            backgroundColor={white}
                            showPillarColours
                            borderWidth="thin"
                        />
                    </>
                ))}
            </TableRowCell>
            <Padding px={12} backgroundColor={palette.neutral[97]} />
            <TableRowCell
                tdStyle={{
                    backgroundColor: jobsBackground,
                    padding: "8px 0 10px 0"
                }}
            >
                <Heading
                    heading={collections[3].displayName}
                    color={palette.neutral[100]}
                />
                <TableRowCell tdStyle={{ padding: "0 10px" }}>
                    {jobsStories.map((story, index) => (
                        <>
                            <HeadlineCard
                                content={story}
                                borderWidth="thin"
                                color={palette.neutral[100]}
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
