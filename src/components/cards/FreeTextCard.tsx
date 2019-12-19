import React from "react";
import { TdCSS, FontCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { TableRow, TableRowCell } from "../../layout/Table";
import { textBody } from "../../styles/typography";
import ReactHtmlParser from "react-html-parser";
import { renderToStaticMarkup } from "react-dom/server";

const outerTdStyle: TdCSS = {
    padding: "0 10px",
    verticalAlign: "top",
    backgroundColor: palette.neutral[97]
};

const innerTdStyle: TdCSS = {
    padding: "6px 12px 12px 6px",
    verticalAlign: "top",
    backgroundColor: palette.neutral[100]
};

const freeTextStyle: FontCSS = {
    ...textBody({ level: 1 }),
    color: palette.neutral[7]
};

interface Props {
    content: Content;
}

const brazeParameter = "?##braze_utm##";

const CustomATag: React.FC<{
    linkTo: string;
    linkText: string;
}> = ({ linkTo, linkText }) => {
    // TODO: check whether we actually want the Braze parameter to be added
    return (
        <a href={linkTo + brazeParameter} style={{ color: palette.brand.main }}>
            {linkText}
        </a>
    );
};

export const FreeTextCard: React.FC<Props> = ({ content }) => {
    const { headline } = content.header;

    // WIP
    // Parse HTML in string to find elements that need to be converted into React components.
    // Currently we only transform <a> tags as they need custom styling.
    // So we transform a <a> tag in the text into our LinkTag component, which handles the link styling.
    const transform = (node: any): React.ReactElement => {
        if (node.type === "tag" && node.name === "a" && node.attribs.href) {
            return (
                <CustomATag
                    linkTo={node.attribs.href}
                    linkText={node.children[0].data}
                />
            );
        }
    };

    const parsedText = ReactHtmlParser(headline, { transform });
    // @ts-ignore as verticalAlign isn't valid in type image
    const transformedText = renderToStaticMarkup(parsedText);

    return (
        <TableRowCell tableStyle={{ height: "100%" }} tdStyle={outerTdStyle}>
            <TableRow>
                <td style={innerTdStyle}>
                    <span
                        style={freeTextStyle}
                        dangerouslySetInnerHTML={{
                            __html: transformedText
                        }}
                    ></span>
                </td>
            </TableRow>
        </TableRowCell>
    );
};
