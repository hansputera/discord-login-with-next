import fetch from "node-fetch";
import config from "../config.json";

/**
 * 
 * @param {String} code Callback code.
 */
export default async function CallbackManager(code) {
	const response = await fetch(`${config.discord.api}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        "client_id": config['clientID'],
			  "client_secret": config['clientSecret'],
			  "grant_type": "authorization_code",
			  "code": code,
			  "redirect_uri": config['callbackURL'],
			  "scope": "identify"
      })
    });

	if (!response.ok) {
		console.error("ERRNO JSON:", await response.json());
		return null;
	} else {
		return await response.json()
	}
};