import { Component } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { PeopleService } from '../services/people.service';
import { CallState } from '../shared/CallState';
import { SearchResult } from './search.model';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent {
	public colorOptions = [
		{ value: 'blue', text: 'Blue' },
		{ value: 'red', text: 'Red' },
		{ value: 'green', text: 'Green' }
	];

	public name = '';
	public favoriteColor = '';
	public searchState: CallState = 'NotStarted';

	public searchResults$ = new BehaviorSubject<SearchResult[]>([]);

	constructor(private peopleService: PeopleService) { }

	onSearch(): void {
		this.searchState = 'InProgress';
		this.peopleService.search(this.name, this.favoriteColor)
			.pipe(catchError(() => {
				this.searchState = 'Error';
				return throwError('An unexpected error has occurred');
			}))
			.subscribe(result => {
				this.searchState = 'Complete';
				this.searchResults$.next(result.matches);
			});
	}

	getNoResultsMessage(): string {
		switch (this.searchState) {
			case 'NotStarted':
				return 'Search for people';
			case 'InProgress':
				return 'Loading results';
			case 'Complete':
				return 'No results found';
			default:
				return 'An error has occurred';
		}
	}
}