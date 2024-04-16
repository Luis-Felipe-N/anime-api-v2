"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Normalize = void 0;
class Normalize {
    constructor(text) {
        this.text = text;
    }
    /**
     * Normalize a text by removing symbols and specials characters
     *
     * Example: "Hell's Paradise" => "hells paradise"
     *
     * @param text {string}
     */
    static normalizeText(text) {
        return text
            .normalize('NFKD')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .replace(/[^\w-]+/g, '')
            .replace(/_/g, ' ')
            .replace(/--+/g, ' ')
            .replace(/-$/g, '');
    }
}
exports.Normalize = Normalize;
