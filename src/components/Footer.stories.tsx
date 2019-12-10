import React from "react";
import { Footer } from "./Footer";

export default {
    // component: Footer,
    title: "Components/Footer"
};

export const defaultStory = () => (
    <Footer frontId={"email/film-today"} title="Film Today" />
);
defaultStory.story = { name: "Emails footer" };
