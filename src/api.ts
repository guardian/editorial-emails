import aws from "aws-sdk";
import { Stream } from "stream";
import zlib from "zlib";

process.env.AWS_PROFILE = "frontend";

const client = new aws.S3();

const toString = (s: Stream): Promise<string> => {
    const promise: Promise<string> = new Promise((resolve, reject) => {
        let str = "";
        s.on("data", data => {
            str += data.toString();
        });
        s.on("end", () => resolve(str));
        s.on("error", reject);
    });

    return promise;
};

const get = async (path: string): Promise<Front> => {
    const params = {
        Bucket: "aws-frontend-store",
        Key: `PROD/frontsapi/pressed/live/email/${path}/fapi/pressed.v2.lite.json`,
        ResponseContentEncoding: "utf-8"
    };

    try {
        const res = client
            .getObject(params)
            .createReadStream()
            .pipe(zlib.createGunzip());

        const json = await toString(res);

        return Promise.resolve(asFront(JSON.parse(json)));
    } catch (e) {
        return Promise.reject(e);
    }
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

interface Content {
    properties: Properties;
    card: Card;
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
