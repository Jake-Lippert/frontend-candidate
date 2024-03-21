import { Component, Input } from '@angular/core';

@Component({
	selector: 'result-card',
	templateUrl: './result-card.component.html',
	styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {
	@Input() public href = '';
}