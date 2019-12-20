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

export const FreeTextBold: React.FC<{
    text: string;
}> = ({ text }) => <strong>{text}</strong>;

export const FreeTextItalic: React.FC<{
    text: string;
}> = ({ text }) => <em>{text}</em>;

const getNodeText = (node: any): any => {
    console.log("========> NODE");
    console.log(node);

    const nodeText = node.children.map((child: any) => {
        if (child.type === "text") {
            return child.data;
        } else if (child.type === "tag") {
            if (child.name === "strong") {
                return renderToStaticMarkup(
                    <FreeTextBold text={getNodeText(child)} />
                );
            }
            if (child.name === "em") {
                return renderToStaticMarkup(
                    <FreeTextItalic text={getNodeText(child)} />
                );
            }
            // return `<${child.name}>${getNodeText(child)}</${child.name}>`;
        }
        return getNodeText(child);
    });

    // console.log("=== NODE TEXT");
    // console.log(nodeText);

    return nodeText.join("");
};

const transform = (node: any): React.ReactElement | null => {
    if (node.type === "tag" && node.name === "a" && node.attribs.href) {
        // Only replace <a> tag with FreeTextLink if we can successfully
        // read the link text from inside the <a> tag
        // const linkTo = node.attribs.href;
        // const linkText =
        //     node.children && node.children[0] ? node.children[0].data : null;

        //console.log("======= LINK");
        //console.log(node);

        // let linkTest = node.children.map(child =>
        //     child.type === "text" ? child.data : child.children[0].data
        // );

        const linkText = getNodeText(node);
        console.log("=== LINK TEXT:");
        console.log(linkText);

        if (linkText) {
            return (
                <FreeTextLink linkTo={node.attribs.href} linkText={linkText} />
            );
        }
    }

    if (node.type === "tag" && node.name === "img" && node.attribs.src) {
        const { src, alt } = node.attribs;
        return <Image src={src} alt={alt || ""} width={560} />;
    }
};
