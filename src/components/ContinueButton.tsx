import React from "react";
import { LinkCSS, ImageCSS } from "../css";
import { TableRowCell } from "../layout/Table";

interface Props {
    label: string;
    linkTo: string;
}

// Splitting the CSS for the button link into two separate objects;
// First, all the standard LinkCSS properties we need, so they can be typechecked...
const anchorStyles: LinkCSS = {
    color: "#ffffff",
    fontFamily: "'Guardian Text Sans',sans-serif",
    fontSize: "17px",
    lineHeight: "36px",
    textAlign: "center",
    textDecoration: "none",
    padding: "0"
};

// Then, all the extra CSS properties we need, including vendor prefixes,
// which are only relevant to this component and should not be added to the LinkCSS type.
const anchorStylesWithPrefixes: any = {
    ...anchorStyles,
    backgroundColor: "#a1845c",
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
    const buttonMSOMarkup = `<!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${linkTo}" style="height:28pt;v-text-anchor:middle;width:150pt;" arcsize="50%" strokecolor="#a1845c" fillcolor="#a1845c">
    <w:anchorlock></w:anchorlock>
    <center>
        <table style="border-spacing:0;border-collapse:collapse;width:100%">
        <tr>
            <td style="color:#ffffff;font-family:'Guardian Text Sans',sans-serif;font-size:17px;line-height:17px;">${label}&nbsp;&nbsp;</td>
            <td><img style="vertical-align: middle !important; vertical-align: middle;" src="https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5ddbbab098cf4b54f875f12f/original.png?1574681264" width="23" height="22" border="0" alt="" /></td>
        </tr>
        </table>
    </center>
    </v:roundrect>
    <![endif]-->`;
    return (
        <table>
            <tr>
                <td>
                    <div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: buttonMSOMarkup
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
                </td>
            </tr>
        </table>
    );
};
