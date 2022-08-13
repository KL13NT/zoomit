import type { Replacer } from "~interfaces";

export const websites: Record<string, Replacer[]> = {
	"pbs.twimg.com": [
		{
			regex: "https:\\/\\/pbs.twimg.com\\/media\\/([a-zA-Z0-9-_]+).+",
			result: "https://pbs.twimg.com/media/$1?format=jpg&name=4096x4096",
			type: "image",
		},
		{
			regex:
				"https:\\/\\/pbs.twimg.com\\/tweet_video_thumb\\/([a-zA-Z0-9-_]+).+",
			result: "https://video.twimg.com/tweet_video/$1.mp4",
			type: "video",
		},
		{
			regex:
				"https:\\/\\/pbs.twimg.com\\/semantic_core_img\\/([0-9]+)\\/([a-zA-Z0-9-_]+).+",
			result:
				"https://video.twimg.com/semantic_core_img/$1/$2?format=jpg&name=4096x4096",
			type: "image",
		},
	],
};
