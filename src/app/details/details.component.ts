import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, switchMap, throwError } from 'rxjs';
import { PeopleService } from '../services/people.service';
import { CallState } from '../shared/CallState';
import { mapPerson, Person } from './details.model';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
	public loadState: CallState = 'NotStarted';

	public person$: Observable<Person> = of();

	constructor(
		private route: ActivatedRoute,
		private peopleService: PeopleService
	) {
		this.person$ = this.route.paramMap.pipe(
			map(params => params.get('id')),
			switchMap(id => {
				this.loadState = 'InProgress';
				return this.peopleService.details(id);
			}),
			map(mapPerson),
			catchError(err => {
				switch (Number(err?.status)) {
					case 404:
					case 410:
						this.loadState = 'Complete';
						return EMPTY;
				}

				this.loadState = 'Error';
				return throwError('An unexpected error has occurred');
			})
		);
	}

	getNoContentMessage(): string {
		switch (this.loadState) {
			case 'NotStarted':
			case 'InProgress':
				return 'Loading results';
			case 'Complete':
				return 'No results found';
			default:
				return 'An error has occurred';
		}
	}
}