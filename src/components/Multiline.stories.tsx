import React from "react";
import { Multiline } from "./Multiline";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../layout/Center";
import { TableRowCell } from "../layout/Table";

export default {
    component: Multiline,
    title: "Components/Multiline",
    decorators: [withKnobs]
};

export const defaultStory = () => (
    <Center>
        <TableRowCell>
            <Multiline />
        </TableRowCell>
    </Center>
);

defaultStory.story = { name: "With no top padding" };

export const paddingStory = () => (
    <table style={{ width: "100%" }}>
        <Center>
            <TableRowCell>
                <Multiline topPadding />
            </TableRowCell>
        </Center>
    </table>
);

paddingStory.story = { name: "With top padding" };
