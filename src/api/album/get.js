import { remoteApiUrl, remoteApiVersion } from "@/api/api";
import { albums } from "@/api/mockups";

export const fetchAlbum = async (albumId) => {
	let response;
	
	try {
		response = await fetch(
			`${remoteApiUrl}/${remoteApiVersion}/album/${albumId}`,
			{
				method: "GET",
				headers: {
					"Accept": "application/json",
				},
			},
		);
	} catch (e) {
		// throw new Error("error fetching data");
		
		/*** simulate backend response ***/
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 50);
		});
		
		return albums;
		/*** simulate backend response ***/
	}
	
	if (response.ok) {
		let album;
		
		try {
			album = await response.json();
		} catch (e) {
			throw new Error("error parsing response");
		}
		
		return album;
	} else {
		throw new Error(`${response.status}`);
	}
}