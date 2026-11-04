# Caption Fox demo

A local Next.js demo for extracting and searching YouTube captions. Paste a video URL or ID, select a language, and extract the transcript. Click the title or timestamps to open YouTube, search the captions, or copy/download the full transcript as a TXT file.

Use Node.js 26 and pnpm 12. From the repository root:

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm build
cd sample
pnpm install --frozen-lockfile --ignore-scripts
pnpm dev
```

Open http://localhost:3000. The demo uses the local library build; after changing library code, run `pnpm build` in the repository root and reinstall the sample dependencies. YouTube access is required. An empty result can mean captions are unavailable or a request failed; when the requested language is unavailable, the library selects the first available track.
