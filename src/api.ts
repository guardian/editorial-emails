import aws from "aws-sdk";
import { pipeline, Stream } from "stream";
import zlib from "zlib";

process.env.AWS_PROFILE = "frontend";

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

// e.g. see
// https://github.com/guardian/frontend/blob/master/common/app/implicits/FaciaContentFrontendHelpers.scala#L19
// for image
interface InnerContent {
    trail: {
        trailPicture: {
            allImages: Image[];
        };
    };
}

interface Properties {
    byline: string;
    webTitle: string;
    webUrl: string;
    maybeContent: InnerContent;
}

interface Card {
    id: string;
    trailText: string;
    starRating?: number;
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
}

export interface Content {
    properties: Properties;
    card: Card;
    header: Header;
}

export interface Collection {
    id: string;
    displayName: string;
    backfill: Content[];
}

export interface Front {
    id: string;
    collections: Collection[];
}

const asFront = (obj: object): Front => {
    return obj as Front; // TODO actually validate this and log/handle errors
};
