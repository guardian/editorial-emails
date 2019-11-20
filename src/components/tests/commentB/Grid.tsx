import React from "react";
import { ContributorImageWrapper, getContributor } from "./Card";
import { palette } from "@guardian/src-foundations";
import { TableRowCell, TableRow } from "../../../layout/Table";
import { Padding } from "../../../layout/Padding";
import { Content } from "../../../api";
import { GridRow, partition } from "../../../layout/Grid";
import { Card as CommentCard } from "./Card";

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
        const hasContributor = pair.find(c => {
            const tag = getContributor(c);
            return tag.properties.contributorLargeImagePath;
        });

        const contributorLeft = (
            <ContributorImageWrapper content={pair[0]} salt={salt} />
        );

        const contributorRight = (
            <ContributorImageWrapper content={pair[1]} salt={salt} />
        );

        const contributor = (node: React.ReactNode): React.ReactNode => (
            <TableRow>
                <td style={{ width: "50%" }}></td>
                <td style={{ width: "50%" }}>{node}</td>
            </TableRow>
        );

        return (
            <React.Fragment key={i}>
                <GridRow
                    left={
                        <CommentCard
                            content={pair[0]}
                            salt={salt}
                            size={"small"}
                            shouldShowImage={shouldShowGridImages}
                        />
                    }
                    right={
                        <CommentCard
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

                <Padding px={10} />
            </React.Fragment>
        );
    });

    return <TableRowCell>{rows}</TableRowCell>;
};
