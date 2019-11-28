const CDNFontPath = "https://assets.guim.co.uk/static/frontend";

export const fontStyles = `
td {
    padding: 0;
}

/** https://litmus.com/community/snippets/113-override-gmail-blue-links **/
/** https://litmus.com/community/snippets/118-remove-samsung-blue-links **/
u + .body a,
#MessageViewBody a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit
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

html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}

@font-face {
    font-family: "GH Guardian Headline";
    src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Light.woff) format("woff");
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: "GH Guardian Headline";
    src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-LightItalic.woff) format("woff");
    font-weight: 300;
    font-style: italic;
}

@font-face {
    font-family: "GH Guardian Headline";
    src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Medium.woff) format("woff");
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: "GH Guardian Headline";
    src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-MediumItalic.woff) format("woff");
    font-weight: 500;
    font-style: italic;
}

@font-face {
    font-family: "GH Guardian Headline";
    src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-Bold.woff) format("woff");
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: "GH Guardian Headline";
    src: url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-BoldItalic.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-headline/noalts-not-hinted/GHGuardianHeadline-BoldItalic.woff) format("woff");
    font-weight: 700;
    font-style: italic;
}

@font-face {
    font-family: "Guardian Text Egyptian";
    src: url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-Regular.woff) format("woff");
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: "Guardian Text Egyptian";
    src: url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularItalic.woff) format("woff");
    font-weight: 400;
    font-style: italic;
}

@font-face {
    font-family: "Guardian Text Egyptian";
    src: url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularBold.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-textegyptian/noalts-not-hinted/GuardianTextEgyptian-RegularBold.woff) format("woff");
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: "Guardian Text Sans";
    src: url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Regular.woff) format("woff");
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: "Guardian Text Sans";
    src: url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-RegularItalic.woff) format("woff");
    font-weight: 400;
    font-style: italic;
}

@font-face {
    font-family: "Guardian Text Sans";
    src: url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff2) format("woff2"),
         url(${CDNFontPath}/fonts/guardian-textsans/noalts-not-hinted/GuardianTextSans-Bold.woff) format("woff");
    font-weight: 700;
    font-style: normal;
}
`;
