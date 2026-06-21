export interface GnomeAbilities {
  strength: number;   // 1-10
  defence: number;    // 1-10
  appearance: number; // 1-10
}

export interface Gnome {
  id: number;
  name: string;
  description: string;
  abilities: GnomeAbilities;
  imageUrl: string;
  price: number;
}
