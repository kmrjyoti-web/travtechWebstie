import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { UpdateSectionVm } from '../../models/update-section.model';

@Component({
    selector: 'app-update-card',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './update-card.component.html',
})
export class UpdateCardComponent {
    @Input({ required: true }) vm!: UpdateSectionVm;

    @Input() email: string = '';
    @Input() error: string | null = null;

    @Output() emailChange = new EventEmitter<string>();
    @Output() submit = new EventEmitter<void>();

    onInput(v: string): void {
        this.emailChange.emit(v);
    }

    onSubmit(): void {
        this.submit.emit();
    }
}