import React from "react";
import { LinkCSS, ImageCSS } from "../../css";
import { Table, TableRow, TableRowCell } from "../../layout/Table";
import { palette } from "@guardian/src-foundations";
import { text } from "express";

interface Props {
    label: string;
    linkTo: string;
    backgroundColor?: string;
    isFullWidth?: boolean;
}

// Splitting the CSS for the button link into two separate objects;
// First, all the standard LinkCSS properties we need, so they can be typechecked...
const anchorStyles: LinkCSS = {
    fontFamily: "'Guardian Text Sans',sans-serif",
    fontSize: "17px",
    lineHeight: "36px",
    fontWeight: 700,
    color: palette.neutral[100],
    textAlign: "center",
    textDecoration: "none",
    padding: "0"
};

// Then, all the extra CSS properties we need, including vendor prefixes,
// which are only relevant to this component and should not be added to the LinkCSS type.
const anchorStylesWithPrefixes = (
    isFullWidth: boolean,
    buttonColor: string
): any => {
    return {
        ...anchorStyles,
        width: isFullWidth ? "100%" : "auto",
        backgroundColor: buttonColor,
        borderRadius: "20px",
        display: "inline-block",
        minWidth: "200px",
        WebkitTextSizeAdjust: "none",
        msoHide: "all"
    };
};

const imgStyles: ImageCSS = {
    verticalAlign: "middle",
    border: "0"
};

const labelLeftStyles = (isFullWidth: boolean) => {
    if (isFullWidth) {
        return {
            width: "100%"
        };
    }

    return {};
};

const labelRightStyles = (isFullWidth: boolean) => {
    if (isFullWidth) {
        return {
            width: "23px",
            paddingRight: "18px"
        };
    }

    return {};
};

export const ContinueButton: React.FC<Props> = ({
    label,
    linkTo,
    backgroundColor,
    isFullWidth = false
}) => {
    const buttonColor = backgroundColor || palette.culture.main;
    // The MSO (Microsoft Outlook) button uses HTML elements that won't validate against out JSX types.
    // Work around this by using a combination of JSX and strings (where JSX isn't possible).
    const outlookButtonMarkup = `
    <!--[if mso]>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${linkTo}" style="height:28pt;v-text-anchor:middle;width:150pt;" arcsize="50%" strokecolor="${buttonColor}" fillcolor="${buttonColor}">
        <w:anchorlock></w:anchorlock>
        <center>
            ${(
                <TableRow>
                    <td
                        style={{
                            fontFamily: "'Guardian Text Sans',sans-serif;",
                            color: "#FFFFFF",
                            fontSize: "17px",
                            lineHeight: "17px;"
                        }}
                    >
                        ${label}&nbsp;&nbsp;
                    </td>
                    <td>
                        {/*
                    // @ts-ignore as verticalAlign isn't valid in type image */}
                        <img
                            style={{ verticalAlign: "middle !important" }}
                            src="https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5ddbbab098cf4b54f875f12f/original.png?1574681264"
                            width="23"
                            height="22"
                            border="0"
                            alt=""
                        />
                    </td>
                </TableRow>
            )}
        </center>
        </v:roundrect>
    <![endif]-->`;

    return (
        <TableRowCell>
            <div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: outlookButtonMarkup
                    }}
                />
                <a
                    href={linkTo}
                    target="_blank"
                    style={anchorStylesWithPrefixes(isFullWidth, buttonColor)}
                >
                    {isFullWidth ? (
                        <TableRow>
                            <td style={labelLeftStyles(isFullWidth)}>
                                {label}
                            </td>
                            <td style={labelRightStyles(isFullWidth)}>
                                <img
                                    style={imgStyles}
                                    src="https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5ddbbab098cf4b54f875f12f/original.png?1574681264"
                                    width="23"
                                    height="22"
                                    alt=""
                                />
                            </td>
                        </TableRow>
                    ) : (
                        <>
                            {label}&nbsp;&nbsp;
                            <img
                                style={imgStyles}
                                src="https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5ddbbab098cf4b54f875f12f/original.png?1574681264"
                                width="23"
                                height="22"
                                alt=""
                            />
                        </>
                    )}
                </a>
            </div>
        </TableRowCell>
    );
};
