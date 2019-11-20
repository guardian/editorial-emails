import React from "react";
import { ContributorImageWrapper, getContributor } from "./Card";
import { palette } from "@guardian/src-foundations";
import { TableRow, TableRowCell } from "../../../layout/Table";
import { Padding } from "../../../layout/Padding";
import { Content } from "../../../api";
import { GridRow, partition } from "../../../layout/Grid";
import { TableCSS } from "../../../css";
import { Card as CommentCard } from "./Card";

interface CommentGridProps {
    content: Content[];
    salt: string;
    shouldShowGridImages: boolean;
}

const tableStyle: TableCSS = {
    borderCollapse: "collapse",
    borderSpacing: 0
};

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
                    leftStyles={{
                        backgroundColor: palette.neutral[100],
                        borderLeft: `1px solid ${palette.opinion.main}`
                    }}
                    rightStyles={{
                        backgroundColor: palette.neutral[100],
                        borderLeft: `1px solid ${palette.opinion.main}`
                    }}
                />
                {hasContributor ? (
                    <GridRow
                        left={contributor(contributorLeft)}
                        right={contributor(contributorRight)}
                        leftStyles={{
                            backgroundColor: palette.neutral[100],
                            verticalAlign: "bottom",
                            borderLeft: `1px solid ${palette.opinion.main}`,
                            borderBottom: `1px solid ${palette.opinion.main}`
                        }}
                        rightStyles={{
                            backgroundColor: palette.neutral[100],
                            verticalAlign: "bottom",
                            borderLeft: `1px solid ${palette.opinion.main}`,
                            borderBottom: `1px solid ${palette.opinion.main}`
                        }}
                    />
                ) : (
                    <GridRow
                        left="&nbsp;"
                        right="&nbsp;"
                        leftStyles={{
                            backgroundColor: palette.neutral[100],
                            verticalAlign: "bottom",
                            borderLeft: `1px solid ${palette.opinion.main}`,
                            borderBottom: `1px solid ${palette.opinion.main}`,
                            lineHeight: "0"
                        }}
                        rightStyles={{
                            backgroundColor: palette.neutral[100],
                            verticalAlign: "bottom",
                            borderLeft: `1px solid ${palette.opinion.main}`,
                            borderBottom: `1px solid ${palette.opinion.main}`,
                            lineHeight: "0"
                        }}
                    />
                )}

                <Padding px={10} />
            </React.Fragment>
        );
    });

    return <table style={tableStyle}>{rows}</table>;
};
