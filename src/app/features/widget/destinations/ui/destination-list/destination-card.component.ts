import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DestinationCard } from '../../models/destination.model';

@Component({
    selector: 'app-destination-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './destination-card.component.html',
})
export class DestinationCardComponent {
    @Input({ required: true }) card!: DestinationCard;
}