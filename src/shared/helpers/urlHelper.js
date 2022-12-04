export class UrlHelper {
    static createUrl(baseUrl, ...args) {
        return [baseUrl, ...args].join('/').trim();
    }
}