import fetch from "node-fetch";
import config from "../config.json";

/**
 * 
 * @param {String} accessToken
 */
export default async function user(accessToken) {
	const response = await fetch(`${config['discord']['api']}/users/@me`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  
  if (!response.ok) return undefined;
  else {
    const body = await response.json();
    return body;
  }	
}