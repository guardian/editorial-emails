import aws from "aws-sdk";
import zlib from "zlib";
import { Stream } from "stream";

process.env.AWS_PROFILE = "frontend";

const client = new aws.S3();

const toString = (s: Stream): Promise<string> => {
    const promise: Promise<string> = new Promise((resolve, reject) => {
        let string = "";
        s.on("data", data => {
            string += data.toString();
        });
        s.on("end", () => resolve(string));
        s.on("error", reject);
    });

    return promise;
};

const get = async (path: string): Promise<object> => {
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

        return Promise.resolve(JSON.parse(json));
    } catch (e) {
        return Promise.reject(e);
    }
};

export const api = {
    get
};
