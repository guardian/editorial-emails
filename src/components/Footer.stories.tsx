import React from "react";
import { Footer } from "./Footer";
import { withKnobs, text } from "@storybook/addon-knobs";

export default {
    component: Footer,
    title: "Components/Footer",
    decorators: [withKnobs]
};

export const defaultStory = () => (
    <Footer
        title={text("title", "Film Today")}
        frontId={text("frontId", "email/film-today")}
    />
);

defaultStory.story = { name: "Film Today footer" };

export const opinionStory = () => (
    <Footer title="The Best of Guardian Opinion" frontId="email/opinion" />
);
opinionStory.story = { name: "Best of Guardian Opinion footer" };
