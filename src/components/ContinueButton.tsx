import React from "react";
import { TableRowCell } from "../layout/Table";

interface Props {
    label: string;
    linkTo: string;
}

export const ContinueButton: React.FC<Props> = ({ label, linkTo }) => {
    const buttonMarkup = `<div>
    <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${linkTo}" style="height:28pt;v-text-anchor:middle;width:150pt;" arcsize="50%" strokecolor="#a1845c" fillcolor="#a1845c">
    <w:anchorlock></w:anchorlock>
    <center>
        <table style="border-spacing:0;border-collapse:collapse;width:100%">
        <tr>
            <td style="color:#ffffff;font-family:'Guardian Text Sans',sans-serif;font-size:17px;line-height:17px;">${label}&nbsp;&nbsp;</td>
            <td><img style="vertical-align: middle !important; vertical-align: middle;" src="https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5d1b164d98cf4b77c40ec17a/original.png?1562056269" width="21" height="19" border="0" alt="" /></td>
        </tr>
        </table>
    </center>
    </v:roundrect>
    <![endif]--><a href="${linkTo}" target="_blank" style="background-color:#a1845c;border-radius:20px;color:#ffffff;display:inline-block;font-family:'Guardian Text Sans',sans-serif;font-size:17px;line-height:36px;text-align:center;text-decoration:none;min-width:200px;padding:0;-webkit-text-size-adjust:none;mso-hide:all;">${label}&nbsp;&nbsp;<img style="vertical-align: middle !important; vertical-align: middle;" src="https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5d1b164d98cf4b77c40ec17a/original.png?1562056269" width="21" height="19" border="0" alt="" /></a>
    </div>`;
    return (
        <table>
            <tr>
                <td dangerouslySetInnerHTML={{ __html: buttonMarkup }}></td>
            </tr>
        </table>
    );
};
