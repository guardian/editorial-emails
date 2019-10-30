// TODO possibly use a map definition with key values to simplify
// TODO split out table css from td css

// For spans and a elements
export interface FontCSS {
    textDecoration?: "none";
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
    lineHeight?: string;
    fontStyle?: "italic";
    color?: string;
}

export interface TableCSS {
    borderSpacing?: number;
    borderCollapse?: "collapse";
    borderTop?: string;
    width?: string;
    maxWidth?: string;
    backgroundColor?: string;
    padding?: string;
    color?: string;
    textAlign?: "center";
}

export interface TdCSS extends FontCSS {
    padding?: string;
    paddingBottom?: string;
    borderTop?: string;
}

export interface ImageCSS {
    width?: string;
    outline?: string;
    display?: string;
}
