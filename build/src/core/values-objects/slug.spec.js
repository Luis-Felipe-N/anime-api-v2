"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const slug_1 = require("./slug");
(0, vitest_1.test)('should be able to create a new slug from text', () => {
    const slug = slug_1.Slug.createFromText('Example slug title');
    (0, vitest_1.expect)(slug.value).toEqual('example-slug-title');
});
(0, vitest_1.test)('should be able to create a new slug from text with special character', () => {
    const slug = slug_1.Slug.createFromText('açúcar e melancia');
    (0, vitest_1.expect)(slug.value).toEqual('acucar-e-melancia');
});
