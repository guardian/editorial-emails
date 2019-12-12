import React from "react";
import { Footer } from "./Footer";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../layout/Center";
import { TableRowCell } from "../layout/Table";

export default {
    component: Footer,
    title: "Components/Footer",
    decorators: [withKnobs]
};

export const defaultStory = () => (
    <Center>
        <TableRowCell>
            <Footer
                title={text("title", "Film Today")}
                frontId={text("frontId", "email/film-today")}
            />
        </TableRowCell>
    </Center>
);

defaultStory.story = { name: "Film Today" };

export const opinionStory = () => (
    <Center>
        <TableRowCell>
            <Footer
                title={text("title", "The Best of Guardian Opinion")}
                frontId={text("frontId", "email/opinion")}
            />
        </TableRowCell>
    </Center>
);
opinionStory.story = { name: "The Best of Guardian Opinion" };
