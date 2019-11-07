import md5 from "md5";
import { URL } from "url";

const fastlyURL = "https://i.guim.co.uk/img/";

export const sign = (s: string, salt: string): string => {
    return md5(salt + s);
};

export const source = (guimURL: string): string => {
    const re = /(media|static|uploads|sport).guim.co.uk/;
    const found = guimURL.match(re);

    if (found) {
        return found[1]; // capture group
    }

    return "media";
};

export const starImage = (rating: number): string => {
    const raw = `/img/static/overlays/email-star-rating-${rating}.png`;
    return Buffer.from(raw).toString("base64");
};

// See:
// https://github.com/guardian/frontend/blob/master/common/app/views/support/ImageProfile.scala#L242
export const formatImage = (
    masterURL: string,
    salt: string,
    width: number,
    starRating?: number
): string => {
    // https://docs.fastly.com/api/imageopto/
    const params: any = {
        quality: "45",
        sharpen: "a0.8,r1,t1",
        width: width.toString(),
        dpr: "2",
        fit: "max" // Note, this value looks invalid
    };

    if (starRating) {
        params["overlay-base64"] = `${starImage(starRating)}`;
        params["overlay-align"] = "bottom,left";
    }

    const qs = Object.entries(params)
        .map(kv => `${kv[0]}=${kv[1]}`)
        .join("&");

    const url = new URL(masterURL);
    const pathQuery = url.pathname + "?" + qs;
    const src = source(masterURL);
    const sig = sign(pathQuery, salt);
    const updatedPathQuery = pathQuery + "&s=" + sig;

    return fastlyURL + src + updatedPathQuery;
};
