import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { palette } from "@guardian/src-foundations";
import ReactHtmlParser from "react-html-parser";
import { Image } from "../components/Image";

export const getTransformedFreeText = (freeText: string): string => {
    if (!freeText) return "";

    const parsedText = ReactHtmlParser(freeText, { transform });

    // @ts-ignore
    return renderToStaticMarkup(parsedText);
};

// Styles to apply to every link
const freeTextLinkStyles = {
    color: palette.neutral[7],
    textDecoration: "underline"
};

// Renders <a> tag and its children
export const FreeTextLink: React.FC<{
    linkTo: string;
    children: any;
}> = ({ linkTo, children }) => {
    return (
        <a
            href={linkTo}
            style={freeTextLinkStyles}
            dangerouslySetInnerHTML={{
                __html: children
            }}
        />
    );
};

// Renders <strong> tag and its children
export const FreeTextBold: React.FC<{
    children: any;
}> = ({ children }) => (
    <strong
        dangerouslySetInnerHTML={{
            __html: children
        }}
    />
);

// Renders <em> tag and its children
export const FreeTextItalic: React.FC<{
    children: any;
}> = ({ children }) => (
    <em
        dangerouslySetInnerHTML={{
            __html: children
        }}
    />
);

// Iterate through all children in the node
// Return a component for every element supported,
// Or recursively find the node's text
const getNodeChildren = (node: any): any => {
    const nodeText = node.children.map((child: any) => {
        if (child.type === "text") {
            return child.data;
        } else if (child.type === "tag") {
            if (child.name === "strong") {
                return renderToStaticMarkup(
                    <FreeTextBold>{getNodeChildren(child)}</FreeTextBold>
                );
            }
            if (child.name === "em") {
                return renderToStaticMarkup(
                    <FreeTextItalic>{getNodeChildren(child)}</FreeTextItalic>
                );
            }
        }

        return getNodeChildren(child);
    });

    // Returns a basic string produced by rendering the mapping output as static markup
    return nodeText.join("");
};

const transform = (node: any): React.ReactElement | null => {
    // Transform an <a> tag into a FreeTextLink component
    if (node.type === "tag" && node.name === "a" && node.attribs.href) {
        const linkContent = getNodeChildren(node);

        if (linkContent) {
            return (
                <FreeTextLink linkTo={node.attribs.href}>
                    {linkContent}
                </FreeTextLink>
            );
        }
    }

    if (node.type === "tag" && node.name === "img" && node.attribs.src) {
        const { src, alt } = node.attribs;
        return <Image src={src} alt={alt || ""} width={560} />;
    }
};
