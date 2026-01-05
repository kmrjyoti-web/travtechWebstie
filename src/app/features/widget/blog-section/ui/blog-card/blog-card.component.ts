import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { BlogItemVm } from '../../models/blog-section.model';

@Component({
    selector: 'app-blog-card',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './blog-card.component.html',
})
export class BlogCardComponent {
    @Input({ required: true }) item!: BlogItemVm;
    @Input({ required: true }) routes!: Record<string, any>; // your existing routes object
}