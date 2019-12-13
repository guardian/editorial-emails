import React from "react";
import { palette } from "@guardian/src-foundations";
import { TableRowCell, TableRow } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Content } from "../../../../api";
import { GridRow, partition } from "../../../../layout/Grid";
import {
    CommentCardB,
    ContributorImageWrapper,
    getContributor
} from "../../../../components/cards/CommentCardB";
import { LinkCardB } from "../../../../components/cards/LinkCardB";

interface CommentGridProps {
    content: Content[];
    salt: string;
    shouldShowGridImages: boolean;
}

export const Grid: React.FC<CommentGridProps> = ({
    content,
    salt,
    shouldShowGridImages
}) => {
    const rows = partition(content, 2).map((pair, i) => {
        const hasContributor = pair.find(content => {
            const contributor = getContributor(content);
            if (!contributor) {
                return false;
            }

            return contributor.properties.contributorLargeImagePath;
        });

        const contributorLeft = (
            <ContributorImageWrapper content={pair[0]} salt={salt} />
        );

        const contributorRight = (
            <ContributorImageWrapper content={pair[1]} salt={salt} />
        );

        const contributor = (node: React.ReactNode): React.ReactNode => (
            <TableRow>
                <td style={{ width: "50%", padding: "0" }}></td>
                <td style={{ width: "50%", padding: "0" }}>{node}</td>
            </TableRow>
        );

        return (
            <React.Fragment key={i}>
                <GridRow
                    left={
                        <CommentCardB
                            content={pair[0]}
                            salt={salt}
                            size={"small"}
                            shouldShowImage={shouldShowGridImages}
                        />
                    }
                    right={
                        <CommentCardB
                            content={pair[1]}
                            salt={salt}
                            size={"small"}
                            shouldShowImage={shouldShowGridImages}
                        />
                    }
                    leftStyles={{ backgroundColor: palette.opinion.faded }}
                    rightStyles={{ backgroundColor: palette.opinion.faded }}
                />
                {hasContributor && (
                    <GridRow
                        left={contributor(contributorLeft)}
                        right={contributor(contributorRight)}
                        leftStyles={{
                            backgroundColor: palette.opinion.faded,
                            verticalAlign: "bottom"
                        }}
                        rightStyles={{
                            backgroundColor: palette.opinion.faded,
                            verticalAlign: "bottom"
                        }}
                    />
                )}

                <Padding px={12} />
            </React.Fragment>
        );
    });

    return <TableRowCell>{rows}</TableRowCell>;
};

interface LinkGridProps {
    content: Content[];
    salt: string;
}

// TODO really should accept a React element so that it doesn't have to know
// about Card or salt.
export const LinkGrid: React.FC<LinkGridProps> = ({ content, salt }) => {
    const rowsArray = partition(content, 2);
    const rows = rowsArray.map((pair, index) => (
        <React.Fragment key={index}>
            <GridRow
                left={<LinkCardB content={pair[0]} theme="dark" />}
                right={
                    pair[1] ? (
                        <LinkCardB content={pair[1]} theme="light" />
                    ) : null
                }
                leftStyles={{
                    backgroundColor: palette.neutral[20]
                }}
                rightStyles={{
                    backgroundColor: palette.neutral[86]
                }}
            />
            {index < rowsArray.length - 1 && <Padding px={12} />}
        </React.Fragment>
    ));

    return <TableRowCell>{rows}</TableRowCell>;
};
