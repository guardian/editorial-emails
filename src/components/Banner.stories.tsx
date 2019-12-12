import React from "react";
import { Banner } from "./Banner";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../layout/Center";
import { TableRowCell } from "../layout/Table";

export default {
    component: Banner,
    title: "Components/Banner",
    decorators: [withKnobs]
};

export const defaultStory = () => (
    <Center>
        <TableRowCell>
            <Banner
                title={text("title", "Film Today")}
                frontId={text("frontId", "email/film-today")}
            />
        </TableRowCell>
    </Center>
);

defaultStory.story = { name: "Film Today" };

export const mediaBriefingStory = () => (
    <Center>
        <TableRowCell>
            <Banner
                title={text("title", "Media Briefing")}
                frontId={text("frontId", "email/media-briefing")}
            />
        </TableRowCell>
    </Center>
);

mediaBriefingStory.story = { name: "Media Briefing" };

export const opinionBriefingStory = () => (
    <Center>
        <TableRowCell>
            <Banner
                title={text("title", "The Best of Guardian Opinion")}
                frontId={text("frontId", "email/opinion")}
            />
        </TableRowCell>
    </Center>
);

opinionBriefingStory.story = { name: "The Best of Guardian Opinion" };
