import React from "react";
import { TableRowCell } from "../layout/Table";
import { Image } from "./Image";
import { formatImage } from "../image";

export const Banner: React.FC<{
    title: string;
    frontId: string;
    imageSalt: string;
}> = ({ title, frontId, imageSalt }) => {
    const banners: { [key in string]: string } = {
        "email/opinion":
            "https://static.guim.co.uk/editorial-emails/banners/opinion.png",
        "email/media-briefing":
            "https://static.guim.co.uk/editorial-emails/banners/media-briefing.png",
        "email/sport-au":
            "https://static.guim.co.uk/editorial-emails/banners/australia-sports.png",
        default:
            "https://static.guim.co.uk/editorial-emails/banners/film-today.png"
    };

    const bannerOrigin = banners[frontId] || banners.default;
    const bannerSrc = formatImage(bannerOrigin, imageSalt, 600);

    return (
        <TableRowCell tdStyle={{ padding: "0" }}>
            <Image width={600} src={bannerSrc} alt={title} />
        </TableRowCell>
    );
};
