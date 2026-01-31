import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PopularTourCardVm } from '../../models/popular-tours.model';

@Component({
    selector: 'app-popular-tours-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './popular-tours-card.component.html',
})
export class PopularToursCardComponent {
    @Input({ required: true }) card!: PopularTourCardVm;

    // favorite support
    @Input() isFav: ((id: string) => boolean) | null = null;
    @Input() toggleFav: ((id: string) => void) | null = null;

    onToggleFav(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
        this.toggleFav?.(this.card.id);
    }

    favSelected(): boolean {
        return this.isFav ? this.isFav(this.card.id) : false;
    }
}