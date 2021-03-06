import React from "react";
import { TableRowCell } from "../../layout/Table";
import { TdCSS, LinkCSS, ImageCSS } from "../../css";
import { headline } from "../../styles/typography";

type Theme = "light" | "dark";

const containerStyle: TdCSS = {
    padding: "10px 10px 30px 10px"
};

const fontStyle = (theme: Theme): LinkCSS => ({
    color: theme === "dark" ? "#dcdcdc" : "#121212",
    textDecoration: "none",
    ...headline({ level: 2 })
});

const iconStyle: ImageCSS = {
    height: "1.4em",
    display: "inline-block",
    border: "0"
};

export const LinkCardB: React.FC<{
    headline: string;
    cardUrl: string;
    theme: Theme;
}> = ({ headline, cardUrl, theme }) => {
    const arrow =
        theme === "light"
            ? "https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5dcebdcb9ae1683cc77465a5/original.png?1573830091"
            : "https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5dcebdcb36dc7870b59d36b8/original.png?1573830091";

    return (
        <TableRowCell tdStyle={containerStyle}>
            <a style={fontStyle(theme)} href={cardUrl}>
                {headline}
                <br />
                <br />
                <img height="23" style={iconStyle} src={arrow} alt="arrow" />
            </a>
        </TableRowCell>
    );
};
