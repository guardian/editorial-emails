import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import { FreeTextLink } from "../components/FreeTextLink";
import { Image } from "../components/Image";

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
        if (linkText) {
            return <FreeTextLink linkTo={linkTo} linkText={linkText} />;
        }
    }

    if (node.type === "tag" && node.name === "img" && node.attribs.src) {
        const { src, alt } = node.attribs;
        return <Image src={src} alt={alt || ""} width={560} />;
    }
};
