import { DetailResponse } from '../services/people.dto';

export type Person = {
	id: number;
	name: string;
	favoriteColor: string;
	quotes: Quote[];
};
export type Quote = {
	quote: string;
	likes: number;
};

function compareQuotes(a: Quote, b: Quote): number {
	if (a.likes === b.likes) {
		return a.quote.localeCompare(b.quote);//--Ascending
	}

	return b.likes - a.likes;//--Descending
}

export function mapPerson(person: DetailResponse): Person {
	const quotes: Quote[] = [];
	for (const key in person.quotes) {
		const likes = Number(key);
		quotes.push(...person.quotes[likes].map((quote): Quote => ({
			likes,
			quote
		})));
	}

	quotes.sort(compareQuotes);

	return {
		id: person.id,
		name: person.name,
		favoriteColor: person.favorite_color,
		quotes
	};
}