import React from "react";

export const RowPadding: React.FC<{ px: number }> = ({ px }) => (
    <tr>
        <td className="m-col-pad" style={{ paddingBottom: `${px}px` }}></td>
    </tr>
);
