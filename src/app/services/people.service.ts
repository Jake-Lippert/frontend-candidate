import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailResponse, SearchResponse } from './people.dto';

@Injectable({
	providedIn: 'root'
})
export class PeopleService {
	constructor(private http: HttpClient) { }

	search(term: string, color: string): Observable<SearchResponse> {
		return this.http.get<SearchResponse>("http://localhost:5000/search", {
			params: {
				term,
				color
			}
		});
	}

	details(id: string): Observable<DetailResponse> {
		return this.http.get<DetailResponse>(`http://localhost:5000/details/${id}`);
	}
}