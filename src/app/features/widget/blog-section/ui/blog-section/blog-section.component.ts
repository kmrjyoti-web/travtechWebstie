import { Component, Input, OnInit, inject } from '@angular/core';

import { RouterLink } from '@angular/router';

import { BlogSectionStore } from '../../store/blog-section.store';
import { BlogCardComponent } from '../blog-card/blog-card.component';

@Component({
    selector: 'app-blog-section',
    standalone: true,
    imports: [RouterLink, BlogCardComponent],
    providers: [BlogSectionStore],
    templateUrl: './blog-section.component.html',
})
export class BlogSectionComponent implements OnInit {
    readonly store = inject(BlogSectionStore);

    @Input({ required: true }) routes!: Record<string, any>;

    ngOnInit(): void {
        this.store.load();
    }
}