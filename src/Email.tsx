import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Front } from "./api";
import { Banner } from "./components/Banner";
import { Collections } from "./components/Collections";
import { FilmToday } from "./fronts/film-today/FilmToday";
import { MediaBriefing } from "./fronts/media-briefing/MediaBriefing";
import { SportAus } from "./fronts/sport-aus/SportAus";
import { Opinion } from "./fronts/opinion/Opinion";
import { Footer } from "./components/Footer";
import { Center } from "./layout/Center";
import { default as minifyCssString } from "minify-css-string";
import { fontStyles } from "./styles/fonts";
import { responsiveStyles } from "./styles/responsive-styles";
import { TableRowCell } from "./layout/Table";

enum Fronts {
    Opinion = "email/opinion",
    FilmToday = "email/film-today",
    MediaBriefing = "email/media-briefing",
    SportAus = "email/sport-au"
}

const canonicalURL = (path: string): string =>
    `https://www.theguardian.com/${path}`;

const getTitleFromFrontId = (id: string): string => {
    const tag = id.substring("email/".length);

    return tag
        .split("-")
        .map(s => s[0].toUpperCase() + s.slice(1))
        .join(" ");
};

const getPageTitle = (front: Front): string => {
    if (front.seoData && front.seoData.webTitle) {
        return front.seoData.webTitle;
    }

    return getTitleFromFrontId(front.id);
};

const renderFront = (front: Front, salt: string, variant?: string) => {
    const { id, collections } = front;
    switch (front.id) {
        case Fronts.FilmToday:
            return (
                <FilmToday
                    frontId={id}
                    collections={collections}
                    salt={salt}
                    variant={variant}
                />
            );
        case Fronts.MediaBriefing:
            return (
                <MediaBriefing
                    frontId={id}
                    collections={collections}
                    salt={salt}
                    variant={variant}
                />
            );
        case Fronts.Opinion:
            return (
                <Opinion
                    frontId={id}
                    collections={collections}
                    salt={salt}
                    variant={variant}
                />
            );
        case Fronts.SportAus:
            return (
                <SportAus
                    frontId={id}
                    collections={collections}
                    salt={salt}
                    variant={variant}
                />
            );
        default:
            return (
                <Collections
                    frontId={id}
                    collections={collections}
                    salt={salt}
                />
            );
    }
};

export const Email = (front: Front, salt: string, variant?: string): string => {
    const pageTitle = getPageTitle(front);

    const body = renderToStaticMarkup(
        <Center>
            <TableRowCell tdStyle={{ padding: "0" }}>
                <Banner title={pageTitle} frontId={front.id} />
                {renderFront(front, salt, variant)}
                <Footer title={pageTitle} frontId={front.id} />
            </TableRowCell>
        </Center>
    );

    const favicon =
        process.env.NODE_ENV === "production"
            ? "favicon-32x32.ico"
            : "favicon-32x32-dev-yellow.ico";

    const html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!-- https://litmus.com/community/snippets/112-outlook-2013-120dpi-make-images-scale-properly -->
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en" xml:lang="en">
    <head>
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="${canonicalURL(front.id)}" />
        <link rel="icon" href="https://static.guim.co.uk/images/${favicon}" />
        <title>${pageTitle} | The Guardian</title>

        <!-- Font resets for MS Outlook -->
        <!--[if mso]>
        <style type="text/css">
            h1, h2, h3, h4, h5, h6, p, blockquote {
                font-family: Georgia, serif !important;
            }
        </style>
        <![endif]-->

        <style type="text/css">${minifyCssString(
            fontStyles + responsiveStyles
        )}</style>
    </head>
    <body class="body" style="min-width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;margin:0;padding:0;box-sizing:border-box;width:100%">
        ${body}
    </body>
</html>`;

    // Add Braze placeholder
    const htmlComment = "<!-- Braze Placeholder - Above Footer -->";
    const modifiedHTML = html.replace(
        "###MERCHANDISING_PLACEHOLDER###",
        htmlComment
    );

    return modifiedHTML;
};
