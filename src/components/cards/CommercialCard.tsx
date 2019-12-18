import React from "react";
import { FontCSS, TdCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { formatImage } from "../../image";
import sanitizeHtml from "sanitize-html";
import { Table, RowCell, TableRowCell } from "../../layout/Table";
import { Headline } from "../../components/Headline";
import { Image } from "../../components/Image";
import { headline } from "../../styles/typography";

const tdStyle: TdCSS = {
    backgroundColor: palette.opinion.faded,
    borderTop: `2px solid ${palette.opinion.main}`,
    padding: "0"
};

const metaWrapperStyle = {
    padding: "3px 10px 10px 10px"
};

const standfirstStyle: TdCSS = {
    padding: "20px 10px 10px 10px",
    verticalAlign: "bottom"
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const spanStyle: FontCSS = {
    ...headline({ level: 1 }),
    color: palette.neutral[7]
};

const columnStyleRight: TdCSS = {
    width: "30%",
    verticalAlign: "bottom",
    padding: "0"
};

interface Props {
    content: Content;
    salt: string;
}

const brazeParameter = "?##braze_utm##";

export const CommercialCard: React.FC<Props> = ({ content, salt }) => {
    const image = content.properties.image.item.imageSrc;
    const formattedImage = formatImage(
        image,
        salt,
        600,
        content.card.starRating
    );

    const headline = content.header.headline;
    const backfillURL = content.properties.webUrl + brazeParameter;
    const curatedURL = content.properties.href;
    const cardLink = content.properties.webUrl ? backfillURL : curatedURL;
    const imageURL = formattedImage;
    const imageAlt = content.header.headline;

    return (
        <TableRowCell tdStyle={tdStyle}>
            <Table>
                <RowCell tdStyle={{ padding: "0" }}>
                    <Image
                        src={imageURL}
                        linkTo={cardLink}
                        alt={imageAlt}
                        width={600}
                    />
                </RowCell>
                <tr>
                    <td className="m-pad" style={metaWrapperStyle}>
                        <Headline
                            text={headline}
                            linkTo={cardLink}
                            size="large"
                            pillar="Opinion"
                        />
                    </td>
                </tr>
            </Table>
        </TableRowCell>
    );
};
