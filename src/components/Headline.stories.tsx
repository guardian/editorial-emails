import React from "react";
import { Headline } from "./Headline";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../layout/Center";
import { TableRowCell } from "../layout/Table";

export default {
    component: Headline,
    title: "Components/Headline",
    decorators: [withKnobs]
};

export const defaultStory = () => (
    <Center>
        <TableRowCell>
            <Headline
                text={text(
                    "text",
                    "A classist dystopia?: inside the world’s largest underground shopping complex"
                )}
                linkTo={text(
                    "linkTo",
                    "https://www.theguardian.com/cities/2019/dec/20/a-classist-dystopia-inside-the-worlds-largest-underground-shopping-complex"
                )}
                kicker={text("kicker", "Brexit")}
                pillar="News"
                isLive
            />
        </TableRowCell>
    </Center>
);

defaultStory.story = { name: "News story with Live kicker" };

export const artsStory = () => (
    <Center>
        <TableRowCell>
            <Headline
                text={text(
                    "text",
                    "Classical music must play its part in tackling the climate crisis"
                )}
                linkTo={text(
                    "linkTo",
                    "https://www.theguardian.com/music/2019/dec/20/classical-music-climate-crisis-jasper-parrott"
                )}
                kicker={text("kicker", "Culture")}
                pillar="Arts"
                byline="Joanne Browne"
            />
        </TableRowCell>
    </Center>
);

artsStory.story = { name: "Culture story with text kicker and byline" };

export const bylineStory = () => (
    <Center>
        <TableRowCell>
            <Headline
                text={text(
                    "text",
                    "2019 was not just protests and Fleabag: it was the year a climate truth bomb dropped"
                )}
                linkTo={text(
                    "linkTo",
                    "https://www.theguardian.com/music/2019/dec/20/classical-music-climate-crisis-jasper-parrott"
                )}
                byline="Ashley Brown"
                pillar="Lifestyle"
            />
        </TableRowCell>
    </Center>
);

bylineStory.story = { name: "Lifestyle story with byline" };
