import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Front } from "./api";
import { Banner } from "./components/Banner";
import { Collection } from "./components/Collection";
import { Footer } from "./components/Footer";
import { Grid } from "./components/Grid";
import { Heading } from "./components/Heading";
import { Multiline } from "./components/Multiline";
import { Center } from "./layout/Center";
import { Padding } from "./layout/Padding";

const canonicalURL = (path: string): string =>
    `https://www.theguardian.com/${path}`;

const title = (id: string): string => {
    const tag = id.substring("email/".length);

    return (
        tag
            .split("-")
            .map(s => s[0].toUpperCase() + s.slice(1))
            .join(" ") + " | The Guardian"
    );
};

export const Email = (front: Front, salt: string): string => {
    const collection = front.collections[0];

    const body = renderToStaticMarkup(
        <Center>
            <Banner />
            <Padding px={10} />
            <Multiline />
            <Heading heading={collection.displayName} />
            <Collection collection={collection} salt={salt} />
            <Grid collection={collection} salt={salt} />
            <Footer />
        </Center>
    );

    const favicon =
        process.env.NODE_ENV === "production"
            ? "favicon-32x32.ico"
            : "favicon-32x32-dev-yellow.ico";

    const html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
        <link rel="icon" href="https://static.guim.co.uk/images/${favicon}">
        <title>${title(front.id)}</title>
        <!--[if mso]>
        <style>
            h1, h2, h3, h4, h5, h6, p, blockquote {
                font-family: Georgia, serif !important;
            }
        </style>
        <![endif]-->
        <style>td {padding: 0} .ft__links a:visited { font-family: Helvetica, Arial, sans-serif !important; color: rgb(255, 255, 255) !important; font-size: 12px !important; font-weight: lighter !important; line-height: 14px !important; text-decoration: none !important } .ft__links a:hover { font-family: Helvetica, Arial, sans-serif !important; color: rgb(255, 255, 255) !important; font-size: 12px !important; font-weight: lighter !important; line-height: 14px !important; text-decoration: none !important } .ft__links a:active { font-family: Helvetica, Arial, sans-serif !important; color: rgb(255, 255, 255) !important; font-size: 12px !important; font-weight: lighter !important; line-height: 14px !important; text-decoration: none !important } .free-text a:hover { color: rgb(5, 86, 137) !important } @media screen and (-webkit-min-device-pixel-ratio: 0) {td { -webkit-font-smoothing: antialiased } } @-moz-document url-prefix(){td{-moz-osx-font-smoothing:grayscale}} @font-face {font-family: "Guardian Egyptian Web Header"; src: url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Bold.woff2) format("woff2"), url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Bold.woff) format("woff"); font-weight: 700; font-style: normal} @font-face {font-family: "Guardian Egyptian Web Headline"; src: url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Medium.woff2) format("woff2"), url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Medium.woff) format("woff"); font-weight: 600; font-style: normal} @font-face {font-family: "Guardian Egyptian Web Headline Italic"; src: url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-RegularItalic.woff2) format("woff2"), url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-RegularItalic.woff) format("woff"); font-weight: 400; font-style: normal} @media only screen and (max-width: 600px) {.center-element { min-width: 0 !important } .container { width: 100% !important } }</style>
        <style type="text/css">
        /* Removes blue links on Gmail and Samsung */
        u + .body a,
        #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit }
        /* Sets the full width of the table on Gmail iOS */
        u + .body .gwfw { width:100% !important; width:100vw !important; }
        /* Mobile styles */
        @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
            .m-heading { font-size: 28px!important; line-height: 34px!important; padding:4px 8px 0!important }
            .h-pad { padding: 3px 8px 5px 8px!important }
            .h-small { font-size: 24px!important; line-height: 28px!important; }
            .m-hide { display: none!important }
            .col-h-sm { font-size: 16px!important; line-height: 20px!important }
            .col-pad { padding-bottom: 15px!important }
        }
        </style>
    </head>
    <body class="body" style="min-width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;margin:0;padding:0;box-sizing:border-box;width:100%">
            ${body}
    </body>
</html>`;

    return html;
};
