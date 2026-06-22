import { Component, inject } from '@angular/core';
import { GnomeService } from '../../services/gnome.service';
import { CartService } from '../../services/cart.service';
import { Gnome } from '../../models/gnome';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.html',
})
export class ShopComponent {
  protected readonly gnomeService = inject(GnomeService);
  protected readonly cartService = inject(CartService);

  addToCart(gnome: Gnome): void {
    this.cartService.addToCart(gnome);
  }

  isInCart(gnomeId: number): boolean {
    return this.cartService.items().some((i) => i.gnome.id === gnomeId);
  }
}
