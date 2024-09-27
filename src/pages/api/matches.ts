import { getMatches } from "@/backend/services/match"
import { API_URLS } from "@/config/url"
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const basicStats = async ( req: NextApiRequest,
  res: NextApiResponse,
) => {
	const { region, user_id, user_flag } = req.query
	const url = API_URLS[region as keyof typeof API_URLS]

	return getMatches(url, user_id as string, user_flag as string)
	.then(response => res.json(response))
	.catch(error => { throw error })
}

export default basicStats