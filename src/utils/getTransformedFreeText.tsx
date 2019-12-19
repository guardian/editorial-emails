import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import { TextLink } from "../components/TextLink";

export const getTransformedFreeText = (freeText: string): string => {
    if (!freeText) return "";

    const parsedText = ReactHtmlParser(freeText, { transform });

    // @ts-ignore
    return renderToStaticMarkup(parsedText);
};

const transform = (node: any): React.ReactElement | null => {
    if (node.type === "tag" && node.name === "a" && node.attribs.href) {
        const linkTo = node.attribs.href;
        const linkText = node.children[0].data;
        return <TextLink linkTo={linkTo} linkText={linkText} />;
    }
};
