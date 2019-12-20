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

export const FreeTextLink: React.FC<{
    linkTo: string;
    children: any;
}> = ({ linkTo, children }) => {
    return (
        <a
            href={linkTo}
            style={{ color: palette.neutral[7], textDecoration: "underline" }}
            dangerouslySetInnerHTML={{
                __html: children
            }}
        />
    );
};

export const FreeTextBold: React.FC<{
    children: any;
}> = ({ children }) => (
    <strong
        dangerouslySetInnerHTML={{
            __html: children
        }}
    />
);

export const FreeTextItalic: React.FC<{
    children: any;
}> = ({ children }) => (
    <em
        dangerouslySetInnerHTML={{
            __html: children
        }}
    />
);

const getNodeText = (node: any): any => {
    const nodeText = node.children.map((child: any) => {
        if (child.type === "text") {
            return child.data;
        } else if (child.type === "tag") {
            if (child.name === "strong") {
                return renderToStaticMarkup(
                    <FreeTextBold>{getNodeText(child)}</FreeTextBold>
                );
            }
            if (child.name === "em") {
                return renderToStaticMarkup(
                    <FreeTextItalic>{getNodeText(child)}</FreeTextItalic>
                );
            }
        }

        return getNodeText(child);
    });

    return nodeText.join("");
};

const transform = (node: any, index: number): React.ReactElement | null => {
    if (node.type === "tag" && node.name === "a" && node.attribs.href) {
        const linkChildren = getNodeText(node);

        if (linkChildren) {
            return (
                <FreeTextLink linkTo={node.attribs.href}>
                    {linkChildren}
                </FreeTextLink>
            );
        }
    }

    if (node.type === "tag" && node.name === "img" && node.attribs.src) {
        const { src, alt } = node.attribs;
        return <Image src={src} alt={alt || ""} width={560} />;
    }
};
