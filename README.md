# @dofy/youtube-caption-fox

`@dofy/youtube-caption-fox` is a simple Node.js library for fetching YouTube video captions with ease. Whether you need to extract subtitles for processing, analysis, or translation, this package provides a straightforward API to retrieve captions in different languages.

## Features

- Fetch captions from YouTube videos by video ID
- Support for multiple languages
- Simple and easy-to-use API
- Handles proxy configuration for restricted environments

## Installation

You can install the package using npm:

```bash
npm install @dofy/youtube-caption-fox
```

## Usage

### Basic Usage

Here's an example of how to use `@dofy/youtube-caption-fox` to fetch captions for a YouTube video:

```javascript
import { getCaptions } from '@dofy/youtube-caption-fox'

const videoId = 'your-video-id'

getCaptions(videoId)
  .then(({ captions }) => {
    console.log('Captions:', captions)
  })
  .catch((error) => {
    console.error('Error fetching captions:', error)
  })
```

### Proxy Support

If you are behind a proxy, you can configure the library to use it:

```javascript
import { getCaptions } from '@dofy/youtube-caption-fox'

const videoId = 'your-video-id'

const options = {
  proxy: {
    host: 'proxy-server-address',
    port: 8080,
    protocol: 'http',
    auth: {
      username: 'your-username',
      password: 'your-password',
    },
  },
}

getCaptions(videoId, options)
  .then(({ captions }) => {
    console.log('Captions:', captions)
  })
  .catch((error) => {
    console.error('Error fetching captions:', error)
  })
```

## API

### `getCaptions(videoId, [options])`

- **videoId** (String) - The ID of the YouTube video for which to fetch captions.
- **options** (Object) - Optional. Configuration options, such as proxy settings.

Returns a promise that resolves with the captions data or rejects with an error.

## Example

```javascript
import { getCaptions } from '@dofy/youtube-caption-fox'

const videoId = 'your-video-id'

getCaptions(videoId)
  .then(({ captions }) => {
    console.log(captions) // Captions data in JSON format
  })
  .catch((error) => {
    console.error(error)
  })
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss potential changes.

## Issues

If you encounter any issues or have feature requests, please feel free to [open an issue](https://github.com/dofy/youtube-caption-fox/issues) on GitHub.
