import { Injectable, signal, computed } from '@angular/core';
import { Gnome } from '../models/gnome';

export interface CartItem {
  gnome: Gnome;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalItems = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + item.gnome.price * item.quantity, 0)
  );

  addToCart(gnome: Gnome): void {
    this._items.update((items) => {
      const existing = items.find((i) => i.gnome.id === gnome.id);
      if (existing) {
        return items.map((i) =>
          i.gnome.id === gnome.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { gnome, quantity: 1 }];
    });
  }

  removeFromCart(gnomeId: number): void {
    this._items.update((items) => items.filter((i) => i.gnome.id !== gnomeId));
  }

  updateQuantity(gnomeId: number, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(gnomeId);
      return;
    }
    this._items.update((items) =>
      items.map((i) => (i.gnome.id === gnomeId ? { ...i, quantity } : i))
    );
  }

  clear(): void {
    this._items.set([]);
  }
}
