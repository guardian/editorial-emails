import React from "react";
import { Heading } from "./Heading";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../layout/Center";
import { TableRowCell } from "../layout/Table";

export default {
    component: Heading,
    title: "Components/Heading",
    decorators: [withKnobs]
};

export const defaultStory = () => (
    <Center>
        <TableRowCell>
            <Heading heading={text("heading", "Top Stories")} />
        </TableRowCell>
    </Center>
);

defaultStory.story = { name: "Top Stories" };
