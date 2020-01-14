import React from "react";
import { QuotationMark } from "./QuotationMark";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../layout/Center";
import { TableRowCell } from "../layout/Table";

export default {
    component: QuotationMark,
    title: "Components/QuotationMark",
    decorators: [withKnobs]
};

export const defaultStory = () => (
    <Center>
        <TableRowCell>
            <QuotationMark pillar="News" />
        </TableRowCell>
    </Center>
);

defaultStory.story = { name: "Quotes for News pillar" };

export const sportStory = () => (
    <Center>
        <TableRowCell>
            <QuotationMark pillar="Sport" />
        </TableRowCell>
    </Center>
);

sportStory.story = { name: "Quotes for Sport pillar" };
