import { API_URLS } from "@/config/url"
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const basicStats = async ( req: NextApiRequest,
  res: NextApiResponse,
) => {
	const { region, user_id, user_flag } = req.query
	const url = API_URLS[region as keyof typeof API_URLS]

	return axios.get(`${url}/riot/account/v1/accounts/by-riot-id/${user_id}/${user_flag}?api_key=${process.env.API_KEY}`)
	.then(response => res.json(response.data))
	.catch(e => {throw e})
}

export default basicStats