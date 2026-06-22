import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
})
export class CartComponent {
  protected readonly cartService = inject(CartService);

  updateQuantity(gnomeId: number, quantity: number): void {
    this.cartService.updateQuantity(gnomeId, quantity);
  }

  remove(gnomeId: number): void {
    this.cartService.removeFromCart(gnomeId);
  }

  checkout(): void {
    alert('Order placed! Your gnomes are on their way.');
    this.cartService.clear();
  }
}
