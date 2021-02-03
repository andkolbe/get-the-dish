//@ts-ignore
import * as yelp from 'yelp-fusion';
import config from '../config';

const client = yelp.client(config.keys.yelp);

export const search = async (term: string, location: string) => {
    const response = await client.search({
        term,
        location,
        limit: 5
    })
    return response.jsonBody.businesses;
}