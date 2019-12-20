import React from "react";
import { ContinueButton } from "./ContinueButton";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: ContinueButton,
    title: "Components/ContinueButton",
    decorators: [withKnobs]
};

export const defaultStory = () => (
    <Center>
        <TableRowCell>
            <ContinueButton
                label="Continue reading"
                linkTo="https://www.theguardian.com/cities/2019/dec/20/a-classist-dystopia-inside-the-worlds-largest-underground-shopping-complex"
            />
        </TableRowCell>
    </Center>
);

defaultStory.story = { name: "Continue reading button" };
