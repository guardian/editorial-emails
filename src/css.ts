// TODO possibly use a map definition with key values to simplify
// TODO split out table css from td css

// For spans and a elements
export interface fontCSS {
    textDecoration?: "none";
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
    lineHeight?: string;
    fontStyle?: "italic";
    color?: string;
}

export interface tableCSS {
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

export interface tdCSS extends fontCSS {
    padding?: string;
    paddingBottom?: string;
    borderTop?: string;
}

export interface imageCSS {
    width?: string;
    outline?: string;
    display?: string;
}
