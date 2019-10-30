import { URL } from "url";
import { formatImage, sign, source } from "./image";

test("images are signed correctly", () => {
    const testURLs = [
        "http://media.guim.co.uk/67222cbde87dc147dd34041c2e8692b81f24f546/0_0_1204_1181/500.jpg?width=300&quality=50&height=100"
    ];

    const salt = "haha";

    testURLs.forEach(url => {
        const asURL = new URL(url);
        const got = sign(asURL.pathname + asURL.search, salt);
        const want = "c0b3e8200cdc0f0c1140b08a5f7849a0";
        expect(got).toEqual(want);
    });
});

test("extract image source", () => {
    const cases = [
        ["//uploads.guim.co.uk", "uploads"],
        ["//lol.guim.co.uk", "media"]
    ];

    cases.forEach(testCase => {
        const got = source(testCase[0]);
        const want = testCase[1];
        expect(got).toEqual(want);
    });
});

test("formats full URL", () => {
    const testURLs = [
        "http://media.guim.co.uk/67222cbde87dc147dd34041c2e8692b81f24f546/0_0_1204_1181/500.jpg"
    ];

    testURLs.forEach(url => {
        const got = formatImage(url, "foo");
        const want =
            "https://i.guim.co.uk/img/media/67222cbde87dc147dd34041c2e8692b81f24f546/0_0_1204_1181/500.jpg?quality=45&sharpen=a0.8,r1,t1&width=600&dpr=2&fit=max&s=e6f7cfcca297387ce8efb4ce5164f822";
        expect(got).toEqual(want);
    });
});

test("adds star rating overlay", () => {
    const testURLs = [
        "http://media.guim.co.uk/67222cbde87dc147dd34041c2e8692b81f24f546/0_0_1204_1181/500.jpg"
    ];

    testURLs.forEach(url => {
        const got = formatImage(url, "foo", 3);
        const want =
            "https://i.guim.co.uk/img/media/67222cbde87dc147dd34041c2e8692b81f24f546/0_0_1204_1181/500.jpg?quality=45&sharpen=a0.8,r1,t1&width=600&dpr=2&fit=max&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvZW1haWwtc3Rhci1yYXRpbmctMy5wbmc=&overlay-align=bottom,left&s=36ddc65c8a88349a21aed46b7d08c9c5";
        expect(got).toEqual(want);
    });
});
