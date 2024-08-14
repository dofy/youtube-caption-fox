import axios, { AxiosRequestConfig } from "axios";
import * as cheerio from "cheerio";
import { Script } from "vm";

interface ProxyOptions {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
}

interface GetCaptionsOptions {
  proxy?: ProxyOptions;
  lang?: string; // 字幕语言选项，例如 "en" 或 "fr"
}

interface Caption {
  start: number;
  dur: number;
  text: string;
}

export const getCaptions = async (
  videoId: string,
  options?: GetCaptionsOptions
): Promise<Caption[]> => {
  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    // 配置 Axios 请求
    const config: AxiosRequestConfig = {};

    if (options?.proxy) {
      config.proxy = {
        host: options.proxy.host,
        port: options.proxy.port,
        auth: options.proxy.auth,
      };
    }

    // 获取视频页面内容
    const response = await axios.get(url, config);
    options?.proxy && console.log("🚀 ~ response:", response)

    // 使用 Cheerio 解析 HTML 内容
    const $ = cheerio.load(response.data);

    // 查找字幕信息
    const captionsUrl = findCaptionsUrl($, options?.lang);
    if (!captionsUrl) {
      throw new Error(`Captions not found for video ID: ${videoId}`);
    }

    // 获取并解析字幕内容
    const captionsResponse = await axios.get(captionsUrl);
    const captions = parseCaptions(captionsResponse.data);

    return captions;
  } catch (_error) {
    return [];
  }
};

function findCaptionsUrl($: cheerio.Root, lang?: string): string | null {
  // 查找页面中的字幕信息
  const playerResponse = $("script")
    .filter((_, script: cheerio.Element) => {
      return $(script).html()?.includes("ytInitialPlayerResponse")!;
    })
    .html();

  if (!playerResponse) {
    return null;
  }

  const jsonStr = playerResponse.match(
    /ytInitialPlayerResponse\s*=\s*(\{.*?\});/
  );
  if (!jsonStr || jsonStr.length < 2) {
    return null;
  }

  const playerData = JSON.parse(jsonStr[1]);

  // 提取字幕 URL，根据语言筛选
  const captionsTracks =
    playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
  if (!captionsTracks || captionsTracks.length === 0) {
    return null;
  }

  const track =
    captionsTracks.find((t: any) => t.languageCode === lang) ||
    captionsTracks[0];
  return track?.baseUrl || null;
}

function parseCaptions(data: string): Caption[] {
  // 使用 Cheerio 解析字幕的 XML 数据
  const $ = cheerio.load(data, { xmlMode: true });
  const captions: Caption[] = [];

  $("transcript > text").each((_, element) => {
    const start = parseFloat($(element).attr("start") || "0");
    const dur = parseFloat($(element).attr("dur") || "0");
    const text = $(element).text();

    captions.push({ start, dur, text });
  });

  return captions;
}
