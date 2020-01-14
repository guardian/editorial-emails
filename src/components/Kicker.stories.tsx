import React from "react";
import { Kicker } from "./Kicker";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../layout/Center";
import { TableRowCell } from "../layout/Table";

export default {
    component: Kicker,
    title: "Components/Kicker",
    decorators: [withKnobs]
};

export const defaultStory = () => (
    <Center>
        <TableRowCell>
            <Kicker text="Climate change" pillar="News" />
        </TableRowCell>
    </Center>
);

defaultStory.story = { name: "Basic News kicker" };

export const liveStory = () => (
    <Center>
        <TableRowCell>
            <Kicker text="Live" pillar="News" isLive />
        </TableRowCell>
    </Center>
);

liveStory.story = { name: "Live kicker" };
