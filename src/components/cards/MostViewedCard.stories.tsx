import React from "react";
import { MostViewedCard } from "./MostViewedCard";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: MostViewedCard,
    title: "Cards/MostViewedCard",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <MostViewedCard
                    headline="Donec et rhoncus nisl. Donec posuere neque et posuere gravida."
                    cardUrl="https://www.theguardian.com/lifeandstyle/2019/dec/31/resolution-avoid-quick-fix-diets-nhs-top-doctor"
                    isComment
                    pillar="Lifestyle"
                    byline="David Bowie"
                    kicker="Retrospective"
                    index="5"
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Most Viewed card with Lifestyle pillar"
};

export const differentStory = () => {
    return (
        <Center>
            <TableRowCell>
                <MostViewedCard
                    headline="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas"
                    cardUrl="https://www.theguardian.com/lifeandstyle/2019/dec/31/resolution-avoid-quick-fix-diets-nhs-top-doctor"
                    pillar="News"
                    kicker="Climate crisis"
                    index="10"
                />
            </TableRowCell>
        </Center>
    );
};

differentStory.story = {
    name: "News pillar no byline"
};
