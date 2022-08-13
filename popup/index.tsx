/* eslint-disable jsx-a11y/label-has-associated-control */
import {
	FormEventHandler,
	MouseEventHandler,
	useEffect,
	useState,
} from "react";

import type { MappedReplacer, MediaType } from "~interfaces";
import {
	addWebsiteToStorage,
	loadWebsitesFromStorage,
	removeWebsiteFromStorage,
} from "~libs/utilities";

import "./popup.css";

interface ListingProps {
	websites: MappedReplacer[] | null;
	removeWebsite: MouseEventHandler<HTMLButtonElement>;
}

function Listing({ websites, removeWebsite }: ListingProps) {
	if (!websites)
		return (
			<h2 className="block text-gray-700 text-base font-bold mb-2">
				Loading websites
			</h2>
		);

	return (
		<ul>
			{websites.map((website) => (
				<li
					className="flex justify-between items-center mt-6"
					data-website={website.website}
					data-index={website.index}>
					<div className="mr-4">
						<p className="whitespace-nowrap">
							<span className="font-bold mr-2">Website:</span>
							{website.website}
						</p>
						<p className="whitespace-nowrap">
							<span className="font-bold mr-2">Regex:</span>
							{website.replacer.regex}
						</p>
						<p className="whitespace-nowrap">
							<span className="font-bold mr-2">Result:</span>
							{website.replacer.result}
						</p>
						<p className="whitespace-nowrap">
							<span className="font-bold mr-2">Type:</span>
							{website.replacer.type}
						</p>
					</div>
					<button
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-fit"
						type="button"
						onClick={removeWebsite}>
						🗑
					</button>
				</li>
			))}
		</ul>
	);
}

function Popup() {
	const [websites, setWebsites] = useState<MappedReplacer[] | null>(null);

	const load = () => {
		loadWebsitesFromStorage().then((loaded) => {
			setWebsites(loaded);
		});
	};

	const removeWebsite: MouseEventHandler<HTMLButtonElement> = async (ev) => {
		const target = ev.target as HTMLButtonElement;

		const { website, index } = (target.parentElement as HTMLLIElement).dataset;

		await removeWebsiteFromStorage(website as string, Number(index));

		load();
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
		const form = new FormData(ev.target as HTMLFormElement);

		const data = {
			website: form.get("website") as string,
			regex: form.get("regex") as string,
			result: form.get("result") as string,
			type: form.get("type") as MediaType,
		};

		await addWebsiteToStorage(data);
		load();
	};

	useEffect(() => {
		load();
	}, []);

	return (
		<div className="popup bg-white rounded px-8 pt-6 pb-8 mb-4">
			<h1 className="text-4xl text-center mt-10">Zoomit!</h1>
			<a
				href="https://github.com/KL13NT/zoomit#readme"
				target="_blank"
				rel="noreferrer"
				className="text-center mt-2 block">
				View Docs
			</a>
			<form className="mt-8" onSubmit={onSubmit}>
				<h2 className="text-2xl">Add a new website</h2>
				<p>
					You can manage websites available to zoom by adding them here. You can
					also remove <s>or disable</s> certain websites support.
				</p>
				<div className="mb-4 mt-6">
					<label className="block text-gray-700 text-base font-bold mt-4">
						Website (origin to match)
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="www.example.com"
							name="website"
						/>
					</label>
					<label className="block text-gray-700 text-base font-bold mt-4">
						Regex (regular expression to match with)
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="https:\/\/pbs.twimg.com\/([a-z])"
							name="regex"
						/>
					</label>
					<label className="block text-gray-700 text-base font-bold mt-4">
						Result (string to replace into)
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="www.example.com/$1"
							name="result"
						/>
					</label>
					<label className="block text-gray-700 text-base font-bold mt-4">
						Type (select media type to display)
						<select
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							name="type">
							<option value="image">Images</option>
							<option value="gif">Gifs</option>
							<option value="video">Videos</option>
						</select>
					</label>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit">
						Add
					</button>
				</div>
			</form>

			<hr className="mt-4 mb-4" />

			<Listing websites={websites} removeWebsite={removeWebsite} />
		</div>
	);
}

export default Popup;
