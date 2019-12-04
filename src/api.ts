import aws from "aws-sdk";
import { pipeline, Stream } from "stream";
import zlib from "zlib";

if (process.env.NODE_ENV === "development") {
    process.env.AWS_PROFILE = "frontend";
}

const client = new aws.S3();

// The pipeline helps handle all errors - otherwise, we have to ensure we handle
// errors for each stream explicitly (separately).
const pipelinePromise = (
    s1: NodeJS.ReadableStream,
    s2: NodeJS.WritableStream
): Promise<string> => {
    const p: Promise<string> = new Promise((resolve, reject) => {
        const pipe = pipeline(s1, s2, err => {
            if (err) {
                reject(err);
            }
        });

        let str = "";
        pipe.on("data", data => {
            str += data.toString();
        });
        pipe.on("end", () => {
            resolve(str);
        });
    });

    return p;
};

const get = async (path: string): Promise<Front> => {
    const params = {
        Bucket: "aws-frontend-store",
        Key: `PROD/frontsapi/pressed/live/email/${path}/fapi/pressed.v2.lite.json`,
        ResponseContentEncoding: "utf-8"
    };

    const json = await pipelinePromise(
        client.getObject(params).createReadStream(),
        zlib.createGunzip()
    );

    return asFront(JSON.parse(json));
};

export const api = {
    get
};

interface Image {
    url: string;
    fields: { altText: string };
}

export interface Tag {
    properties: {
        tagType: string;
        contributorLargeImagePath?: string;
        webTitle?: string;
    };
}

// Pillars as returned by the frontend API
export type Pillar = "News" | "Opinion" | "Sport" | "Arts" | "Lifestyle";

// e.g. see
// https://github.com/guardian/frontend/blob/master/common/app/implicits/FaciaContentFrontendHelpers.scala#L19
// for image
interface InnerContent {
    trail: {
        trailPicture: {
            allImages: Image[];
        };
    };
    tags: {
        tags: Tag[];
    };
    fields: {
        standfirst: string;
        body: string;
    };
    metadata: {
        pillar: {
            name: Pillar;
        };
    };
}

interface Properties {
    byline: string;
    webTitle: string;
    webUrl: string;
    maybeContent: InnerContent;
    href?: string;
    showByline?: boolean;
}

interface Card {
    id: string;
    trailText: string;
    starRating?: number;
    cardStyle: {
        type: string;
    };
}

export interface Kicker {
    type: string;
    item: {
        properties: {
            kickerText?: string;
        };
    };
}

interface Header {
    kicker?: Kicker;
    isComment: boolean;
    headline: string;
}

interface Display {
    showQuotedHeadline: boolean;
}

export interface Content {
    properties: Properties;
    card: Card;
    header: Header;
    display: Display;
    type: string;
}

export interface Collection {
    id: string;
    displayName: string;
    backfill: Content[];
    curated: Content[];
    collectionType: string;
    href: string;
}

interface SEOData {
    webTitle: string;
}

export interface Front {
    id: string;
    collections: Collection[];
    seoData: SEOData;
}

const asFront = (obj: object): Front => {
    return obj as Front; // TODO actually validate this and log/handle errors
};
