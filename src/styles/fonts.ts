export const fontStyles = `
td {
    padding: 0;
}

.ft__links a:visited {
    font-family: Helvetica, Arial, sans-serif !important;
    color: rgb(255, 255, 255) !important;
    font-size: 12px !important;
    font-weight: lighter !important;
    line-height: 14px !important;
    text-decoration: none !important;
}

.ft__links a:hover {
    font-family: Helvetica, Arial, sans-serif !important;
    color: rgb(255, 255, 255) !important;
    font-size: 12px !important;
    font-weight: lighter !important;
    line-height: 14px !important;
    text-decoration: none !important;
}

.ft__links a:active {
    font-family: Helvetica, Arial, sans-serif !important;
    color: rgb(255, 255, 255) !important;
    font-size: 12px !important;
    font-weight: lighter !important;
    line-height: 14px !important;
    text-decoration: none !important;
}

.free-text a:hover {
    color: rgb(5, 86, 137) !important;
}

@-moz-document url-prefix() {
    td {
        -moz-osx-font-smoothing: grayscale;
    }
}

@font-face {
    font-family: "Guardian Egyptian Web Header";
    src: url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Bold.woff2)
            format("woff2"),
        url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Bold.woff)
            format("woff");
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: "Guardian Egyptian Web Headline";
    src: url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Medium.woff2)
            format("woff2"),
        url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-Medium.woff)
            format("woff");
    font-weight: 600;
    font-style: normal;
}

@font-face {
    font-family: "Guardian Egyptian Web Headline Italic";
    src: url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-RegularItalic.woff2)
            format("woff2"),
        url(https://interactive.guim.co.uk/fonts/garnett/GHGuardianHeadline-RegularItalic.woff)
            format("woff");
    font-weight: 400;
    font-style: normal;
}
`;
