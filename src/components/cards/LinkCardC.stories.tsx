import React from "react";
import { LinkCardC } from "./LinkCardC";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: LinkCardC,
    title: "Cards/LinkCardC",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <LinkCardC
                    headline="Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
                    cardUrl="https://www.theguardian.com/uk-news/2019/dec/31/loss-working-mens-club-disaster-west-london-estate-south-acton"
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Basic Link Card C"
};
