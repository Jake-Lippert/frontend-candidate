export type SearchResponse = {
	matches: SearchResult[];
};
export type SearchResult = {
	id: string;
	name: string;
};

export type DetailResponse = {
	id: number;
	name: string;
	favorite_color: string;
	quotes: { [likes: number]: string[] };
};