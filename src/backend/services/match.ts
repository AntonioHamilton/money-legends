import axios from "axios"

const getPUUID = (url: string, user_id: string, user_flag: string) => {
	return axios.get(`${url}/riot/account/v1/accounts/by-riot-id/${user_id}/${user_flag}?api_key=${process.env.API_KEY}`)
	.then(response => response.data.puuid)
	.catch(error => {throw error})
}

const getMatchID = (url: string, puuid: string) => {
	return axios.get(`${url}/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${process.env.API_KEY}`)
	.then(response => response.data)
	.catch(error => {throw error})
}

export const getMatches = async (url: string, user_id: string, user_flag: string, lane: string) => {
	const puuid = await getPUUID(url, user_id, user_flag);
	const matchIDS = await getMatchID(url, puuid);

	// const matchesPromises = matchIDS.map((matchID: string) => 
	// 	axios.get(`${url}/lol/match/v5/matches/${matchID}?api_key=${process.env.API_KEY}`)
	// )

	// return Promise.all(matchesPromises)
  // .then(responses => responses.map(response => response.data))
  // .catch(error => { throw error });

	return axios.get(`${url}/lol/match/v5/matches/${matchIDS[0]}?api_key=${process.env.API_KEY}`)
	.then(response => response.data)
  .catch(error => { throw error });
}