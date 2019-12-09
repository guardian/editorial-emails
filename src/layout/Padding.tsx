import React from "react";
import { TableRowCell } from "../layout/Table";

type Props = {
    px: number;
    backgroundColor?: string;
};

// TODO fix this for all clients
export const Padding: React.FC<Props> = ({ px, backgroundColor }) => (
    <TableRowCell
        tdStyle={{
            lineHeight: "0",
            paddingTop: `${px}px`,
            backgroundColor: backgroundColor || "transparent"
        }}
    >
        &nbsp;
    </TableRowCell>
);
