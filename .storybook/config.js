import { configure } from "@storybook/react";

const stories = require.context("../src", true, /\.stories\.js$/);
console.log("=== Stories: ", stories);

configure(stories, module);
