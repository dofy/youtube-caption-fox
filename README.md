# @dofy/youtube-caption-fox

A Node.js library for retrieving YouTube captions and basic video information by video ID.

## Installation

```bash
npm install @dofy/youtube-caption-fox
```

The npm release may differ from the code in this repository; the local demo uses the local build.

## Usage

```js
import { getCaptions } from '@dofy/youtube-caption-fox'

const video = await getCaptions('5I1jTJ9sYeA', { lang: 'en' })
console.log(video.title)
console.log(video.captions) // [{ start, dur, text }, ...]
```

`getCaptions(videoId, options)` returns an object containing `id`, `title`, `description`, `cover`, `publishDate`, and `captions`. Times are in seconds. `lang` defaults to `en`; if the requested language is unavailable, the first available track is used. It does not translate subtitles.

You can pass `proxy: false` to disable a proxy, or configure one with `proxy: { host, port, protocol, auth: { username, password } }`. `protocol` and `auth` are optional.

When no caption track is available, the library returns an empty `captions` array. It also catches request errors, logs them, and returns empty metadata and captions, so an empty result does not distinguish missing captions from an upstream or network failure. YouTube access and caption availability can change.

## Local demo

The [demo](sample/README.md) accepts a YouTube URL or ID, lets you choose a language and search captions, and can copy or download the transcript. Timestamps link to the video.

## Development

Use Node.js 26 and pnpm 12 (the versions are recorded in `.nvmrc` and `packageManager`). From the repository root:

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm build
pnpm test --runInBand
pnpm lint
```

The tests make live YouTube requests, including a direct request without a proxy, so they require appropriate network access. See the [demo instructions](sample/README.md) for running the UI.

## License

[MIT](LICENSE)
