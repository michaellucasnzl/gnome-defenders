import { Component, inject, signal, computed } from '@angular/core';
import { GnomeService } from '../../services/gnome.service';
import { Gnome } from '../../models/gnome';

type AdminView = 'list' | 'detail' | 'edit';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
})
export class AdminComponent {
  protected readonly gnomeService = inject(GnomeService);

  protected view = signal<AdminView>('list');
  protected selectedId = signal<number | null>(null);

  protected editDraft = signal<Gnome | null>(null);

  protected selected = computed(() => {
    const id = this.selectedId();
    return id !== null ? this.gnomeService.getById(id) ?? null : null;
  });

  selectGnome(id: number): void {
    this.selectedId.set(id);
    this.view.set('detail');
  }

  startEdit(): void {
    const gnome = this.selected();
    if (!gnome) return;
    this.editDraft.set({ ...gnome, abilities: { ...gnome.abilities } });
    this.view.set('edit');
  }

  save(): void {
    const draft = this.editDraft();
    if (!draft) return;
    this.gnomeService.update(draft);
    this.selectedId.set(draft.id);
    this.view.set('detail');
  }

  cancel(): void {
    this.view.set('detail');
    this.editDraft.set(null);
  }

  backToList(): void {
    this.view.set('list');
    this.selectedId.set(null);
    this.editDraft.set(null);
  }

  setAbility(field: 'strength' | 'defence' | 'appearance', value: number): void {
    this.editDraft.update((d) => {
      if (!d) return d;
      return { ...d, abilities: { ...d.abilities, [field]: value } };
    });
  }
}
