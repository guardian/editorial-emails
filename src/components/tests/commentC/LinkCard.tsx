import React from "react";
import { Content } from "../../../api";
import { TableRowCell } from "../../../layout/Table";
import { TdCSS, LinkCSS, ImageCSS } from "../../../css";
import { headline } from "../../../styles/typography";
import { palette } from "@guardian/src-foundations";

const brazeParameter = "?##braze_utm##"; // TODO solve link generation

const containerStyle: TdCSS = {
    padding: "10px 10px 30px 10px"
};

const fontStyle: LinkCSS = {
    color: "#121212",
    textDecoration: "none",

    ...headline({ level: 2 })
};

const iconStyle: ImageCSS = {
    height: "1.4em",
    display: "inline-block",
    border: "0"
};

export const LinkCard: React.FC<{
    content: Content;
}> = ({ content }) => {
    const webURL =
        "https://www.theguardian.com" +
        content.properties.href +
        brazeParameter; // TODO type curated content separately?

    const arrow =
        "https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5dcebdcb9ae1683cc77465a5/original.png?1573830091";

    return (
        <TableRowCell tdStyle={containerStyle}>
            <a style={fontStyle} href={webURL}>
                {content.header.headline}
                <br />
                <br />
                <img height="23" style={iconStyle} src={arrow} alt="arrow" />
            </a>
        </TableRowCell>
    );
};
