import React from "react";
import { LinkCardB } from "./LinkCardB";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: LinkCardB,
    title: "Cards/LinkCardB",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <LinkCardB
                    headline="Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
                    cardUrl="https://www.theguardian.com/uk-news/2019/dec/31/loss-working-mens-club-disaster-west-london-estate-south-acton"
                    theme="light"
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Light Link Card B"
};

export const darkStory = () => {
    return (
        <Center>
            <TableRowCell>
                <LinkCardB
                    headline="Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
                    cardUrl="https://www.theguardian.com/uk-news/2019/dec/31/loss-working-mens-club-disaster-west-london-estate-south-acton"
                    theme="dark"
                />
            </TableRowCell>
        </Center>
    );
};

darkStory.story = {
    name: "Dark Link Card C"
};
