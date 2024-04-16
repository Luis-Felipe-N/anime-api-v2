"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valideYoutubeVideoId = void 0;
async function valideYoutubeVideoId(videoId) {
    const url = "http://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
    const { status } = await fetch(url);
    if (status === 404)
        return false;
    return true;
}
exports.valideYoutubeVideoId = valideYoutubeVideoId;
