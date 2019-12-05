import React from "react";
import { Collection as ICollection } from "../../../../api";

export const TopCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection, salt }) => {
    return <h4>Top Collection</h4>;
};
