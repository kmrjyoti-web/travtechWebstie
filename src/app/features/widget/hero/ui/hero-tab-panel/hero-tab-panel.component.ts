import { Component, EventEmitter, Input, Output, signal, computed, effect } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HeroTab, HeroField } from '../../models/hero.model';

@Component({
    selector: 'app-hero-tab-panel',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './hero-tab-panel.component.html',
    styleUrl: './hero-tab-panel.component.scss'
})
export class HeroTabPanelComponent {
    @Input({ required: true }) tabs: HeroTab[] = [];
    @Output() submitTab = new EventEmitter<{ tabId: string; value: any }>();

    readonly activeTabId = signal<string>('');
    readonly form = signal<FormGroup | null>(null);

    readonly activeTab = computed(() => this.tabs.find(t => t.id === this.activeTabId()) ?? this.tabs[0]);

    constructor(private fb: FormBuilder) {
        effect(() => {
            const t = this.activeTab();
            if (!t) return;

            const group: Record<string, any> = {};
            for (const f of t.fields) group[f.key] = [f.defaultValue ?? null];
            const fg = this.fb.group(group);

            this.form.set(fg);
            if (!this.activeTabId()) this.activeTabId.set(t.id);
        });
    }

    setActive(tabId: string) {
        this.activeTabId.set(tabId);
    }

    isFieldVisible(field: HeroField): boolean {
        const rule = field.showIf;
        if (!rule) return true;
        const fg = this.form();
        if (!fg) return true;
        return fg.get(rule.field)?.value === rule.equals;
    }

    inc(fieldKey: string, max = 999) {
        const fg = this.form();
        if (!fg) return;
        const v = Number(fg.get(fieldKey)?.value ?? 0);
        fg.get(fieldKey)?.setValue(Math.min(v + 1, max));
    }

    dec(fieldKey: string, min = 0) {
        const fg = this.form();
        if (!fg) return;
        const v = Number(fg.get(fieldKey)?.value ?? 0);
        fg.get(fieldKey)?.setValue(Math.max(v - 1, min));
    }

    onSubmit() {
        const t = this.activeTab();
        const fg = this.form();
        if (!t || !fg) return;
        this.submitTab.emit({ tabId: t.id, value: fg.getRawValue() });
    }
}