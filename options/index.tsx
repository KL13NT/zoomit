/* eslint-disable react/no-danger */

/* eslint-disable react/no-unescaped-entities */
import "./options.css";

import changelog from "data-text:~CHANGELOG.md";
import readme from "data-text:~README.md";
import { marked } from "marked";

const readmeHTML = marked.parse(readme.replace("# Zoomit!", ""));
const changelogHTML = marked.parse(changelog);

function Options() {
	return (
		<div className="Options bg-white rounded px-8 pt-6 pb-8 m-auto mb-16 w-2/6">
			<h1 className="text-4xl text-center">Zoomit!</h1>
			<p className="mt-4 text-center">
				Thank you for installing Zoomit! You have Zoomit version{" "}
				{chrome.runtime.getManifest().version}.
			</p>

			<div dangerouslySetInnerHTML={{ __html: readmeHTML }} />
			<div dangerouslySetInnerHTML={{ __html: changelogHTML }} />
		</div>
	);
}

export default Options;
