import fetch from "node-fetch";
import config from "../config.json";

/**
 * 
 * @param {String} code Access Token Code
 */
export default async function logoutManager(code) {
	const response = await fetch(`${config['discord']['api']}/oauth2/token/revoke`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			"token": code,
      		"client_id": config['clientID'],
      		"client_secret": config['clientSecret']
		})
	});

	if (!response.ok) {
		return null;
	} else return true;
}