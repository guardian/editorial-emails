import { format } from "@guardian/image";

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

    return format(masterURL, salt, params);
};
