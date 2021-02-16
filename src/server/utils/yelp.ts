//@ts-ignore
import * as yelp from 'yelp-fusion';
import config from '../config';

const client = yelp.client(config.keys.yelp);

export const search = async (term: string, location: string) => {
    const response = await client.search({
        term,
        location,
        limit: 1
    })
    return response.jsonBody.businesses;
}

export const autocomplete = async (text: string) => {
    const response = await client.autocomplete({
        text
    })
    return response.jsonBody.terms;
}