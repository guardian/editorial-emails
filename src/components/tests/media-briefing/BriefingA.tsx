import React from "react";
import { Collection as ICollection } from "../../../api";
import { palette } from "@guardian/src-foundations";
import { DescriptiveCard } from "../../cards/DescriptiveCard";
import { Multiline } from "../../Multiline";
import { Heading } from "../../Heading";
import { HeadlineCard } from "../../cards/HeadlineCard";
import { Padding } from "../../../layout/Padding";
import { TableRowCell } from "../../../layout/Table";
import { colors } from "@guardian/src-foundations/theme";
// import { render } from "react-dom";

export const BriefingA: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const leadStory = collections[0].backfill[0];
    const topStories = collections[0].backfill.slice(1);
    const opinionStories = collections[1].backfill;
    const tvRadioStories = collections[2].backfill;
    const jobsStories = collections[3].curated;

    const containerBackground = palette.neutral[97];
    const headlineCardBackground = palette.neutral[100];
    const jobsBackground = "#00A194";

    return (
        <>
            <DescriptiveCard
                content={leadStory}
                salt={salt}
                showPillarColours
            />

            <TableRowCell tdStyle={{ backgroundColor: containerBackground }}>
                <Multiline topPadding />
                <Heading heading={collections[0].displayName} />
                {topStories.map((story, index) => (
                    <>
                        {index > 0 && <Padding px={4} />}
                        <HeadlineCard
                            content={story}
                            backgroundColor={headlineCardBackground}
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
                            backgroundColor={headlineCardBackground}
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
                            backgroundColor={headlineCardBackground}
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
