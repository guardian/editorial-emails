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
