"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slug = void 0;
class Slug {
    constructor(value) {
        this.value = value;
    }
    static create(text) {
        return new Slug(text);
    }
    /**
     * Transform a text in slug normalize
     *
     * Example: "Hell's Paradise" => "hells-paradise"
     *
     * @param text {string}
     */
    static createFromText(text) {
        const slugText = text
            .normalize('NFKD')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/_/g, '-')
            .replace(/--+/g, '-')
            .replace(/-$/g, '');
        return new Slug(slugText);
    }
}
exports.Slug = Slug;
