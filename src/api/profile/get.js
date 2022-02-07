import { remoteApiUrl, remoteApiVersion } from "@/api/api";
import { profile } from "@/api/mockups";

export const fetchProfile = async (profileId) => {
	let response;
	
	try {
		response = await fetch(
			`${remoteApiUrl}/${remoteApiVersion}/profile/${profileId}`,
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
		
		return profile;
		/*** simulate backend response ***/
	}
	
	if (response.ok) {
		let profile;
		
		try {
			profile = await response.json();
		} catch (e) {
			throw new Error("error parsing response");
		}
		
		return profile;
	} else {
		throw new Error(`${response.status}`);
	}
}