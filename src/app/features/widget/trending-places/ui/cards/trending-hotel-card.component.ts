import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-trending-hotel-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './trending-hotel-card.component.html',
})
export class TrendingHotelCardComponent {
    @Input({ required: true }) item!: any;
    @Input() isFav: ((id: string) => boolean) | null = null;
    @Input() toggleFav: ((id: string) => void) | null = null;

    onFav(e: MouseEvent): void {
        e.preventDefault();
        e.stopPropagation();
        this.toggleFav?.(this.item.id);
    }

    favSelected(): boolean {
        return this.isFav ? this.isFav(this.item.id) : false;
    }
}