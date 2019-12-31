import React from "react";
import { HeadlineCard } from "./HeadlineCard";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: HeadlineCard,
    title: "Cards/HeadlineCard",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <HeadlineCard
                    headline="You may say I'm a dreamer, but I'm not the only one"
                    trailText="I hope some day you'll join us"
                    cardUrl="https://www.theguardian.com/australia-news/2019/dec/31/australia-bushfires-towns-devastated-and-lives-lost-as-blazes-turn-the-sky-red"
                    isComment
                    pillar="Arts"
                    byline="John Lennon"
                    kicker="Music"
                    showPillarColours
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Basic Headline Card"
};

export const expandedStory = () => {
    return (
        <Center>
            <TableRowCell>
                <HeadlineCard
                    headline="In convallis sem purus"
                    trailText="Maecenas in ornare turpis. In pellentesque lacus porta pretium imperdiet. In convallis sem purus, in ultrices purus iaculis ut. Sed tempus ex at diam tristique ullamcorper."
                    cardUrl="https://www.theguardian.com/australia-news/2019/dec/31/australia-bushfires-towns-devastated-and-lives-lost-as-blazes-turn-the-sky-red"
                    pillar="News"
                    byline="Ronald Kaufman"
                    kicker="Music"
                    layout="expanded"
                    showPillarColours
                />
            </TableRowCell>
        </Center>
    );
};

expandedStory.story = {
    name: "Expanded Headline Card"
};

export const arrowStory = () => {
    return (
        <Center>
            <TableRowCell>
                <HeadlineCard
                    headline="Maecenas in ornare turpis. In pellentesque lacus porta pretium imperdiet."
                    trailText="Maecenas in ornare turpis. In pellentesque lacus porta pretium imperdiet. In convallis sem purus, in ultrices purus iaculis ut. Sed tempus ex at diam tristique ullamcorper."
                    cardUrl="https://www.theguardian.com/australia-news/2019/dec/31/australia-bushfires-towns-devastated-and-lives-lost-as-blazes-turn-the-sky-red"
                    showArrow
                />
            </TableRowCell>
        </Center>
    );
};

arrowStory.story = {
    name: "Compact with arrow"
};
