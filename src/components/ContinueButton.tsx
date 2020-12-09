import React from "react";
import { LinkCSS, ImageCSS } from "../css";
import { TableRowCell, Table } from "../layout/Table";
import { palette } from "@guardian/src-foundations";

interface Props {
    label: string;
    linkTo: string;
}

// Splitting the CSS for the button link into two separate objects;
// First, all the standard LinkCSS properties we need, so they can be typechecked...
const anchorStyles: LinkCSS = {
    fontFamily: "'Guardian Text Sans',sans-serif",
    fontSize: "17px",
    lineHeight: "36px",
    color: palette.neutral[100],
    textAlign: "center",
    textDecoration: "none",
    padding: "0"
};

// Then, all the extra CSS properties we need, including vendor prefixes,
// which are only relevant to this component and should not be added to the LinkCSS type.
const anchorStylesWithPrefixes: any = {
    ...anchorStyles,
    backgroundColor: palette.culture.main,
    borderRadius: "20px",
    display: "inline-block",
    minWidth: "200px",
    WebkitTextSizeAdjust: "none",
    msoHide: "all"
};

const imgStyles: ImageCSS = {
    verticalAlign: "middle",
    border: "0"
};

export const ContinueButton: React.FC<Props> = ({ label, linkTo }) => {
    // The MSO (Microsoft Outlook) button uses HTML elements that won't validate against out JSX types.
    // Work around this by using a combination of JSX and strings (where JSX isn't possible).
    const outlookButtonMarkup = `
    <!--[if mso]>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${linkTo}" style="height:28pt;v-text-anchor:middle;width:150pt;" arcsize="50%" strokecolor="#a1845c" fillcolor="#a1845c">
        <w:anchorlock></w:anchorlock>
        <center>
            ${(
                <Table>
                    <tr>
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
                                alt=""
                            />
                        </td>
                    </tr>
                </Table>
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
                    style={anchorStylesWithPrefixes}
                >
                    {label}&nbsp;&nbsp;
                    <img
                        style={imgStyles}
                        src="https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5ddbbab098cf4b54f875f12f/original.png?1574681264"
                        width="23"
                        height="22"
                        alt=""
                    />
                </a>
            </div>
        </TableRowCell>
    );
};
