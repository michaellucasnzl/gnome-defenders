import { Injectable, signal, computed } from '@angular/core';
import { Gnome } from '../models/gnome';

const SEED_GNOMES: Gnome[] = [
  {
    id: 1,
    name: 'Gareth the Guard',
    description: 'A sturdy gnome armed with an acorn-cap shield. Gareth stands watch day and night, repelling slugs, squirrels and the occasional nosy cat.',
    abilities: { strength: 8, defence: 9, appearance: 5 },
    imageUrl: 'https://placehold.co/300x300?text=Gareth',
    price: 24.99,
  },
  {
    id: 2,
    name: 'Pebble the Prickler',
    description: 'Charming but fierce, Pebble sports a razor-sharp pointed hat that deters pests before they even set foot in your flower beds.',
    abilities: { strength: 5, defence: 6, appearance: 8 },
    imageUrl: 'https://placehold.co/300x300?text=Pebble',
    price: 19.99,
  },
  {
    id: 3,
    name: 'Boulderbeard',
    description: 'The strongest gnome in the valley. His enormous beard alone has been known to entangle intruders. Do not underestimate the beard.',
    abilities: { strength: 10, defence: 7, appearance: 4 },
    imageUrl: 'https://placehold.co/300x300?text=Boulderbeard',
    price: 29.99,
  },
  {
    id: 4,
    name: 'Lily the Lookout',
    description: 'Beautiful and eternally vigilant, Lily can spot a rogue mole from 40 metres. Her appearance alone lifts morale across the entire garden.',
    abilities: { strength: 4, defence: 5, appearance: 10 },
    imageUrl: 'https://placehold.co/300x300?text=Lily',
    price: 22.99,
  },
  {
    id: 5,
    name: 'Grim the Grumpy',
    description: 'His perpetual scowl is classified as a bio-deterrent in three counties. Slugs have been observed reversing at full speed upon seeing Grim.',
    abilities: { strength: 7, defence: 8, appearance: 3 },
    imageUrl: 'https://placehold.co/300x300?text=Grim',
    price: 21.99,
  },
  {
    id: 6,
    name: 'Twig the Trickster',
    description: 'A cunning and quick-witted defender who confuses garden invaders with elaborate decoys made from twigs and stolen birdseed.',
    abilities: { strength: 6, defence: 4, appearance: 7 },
    imageUrl: 'https://placehold.co/300x300?text=Twig',
    price: 18.99,
  },
  {
    id: 7,
    name: 'Rocky the Reliable',
    description: 'Unshakeable, unflappable, and unmovable. Rocky has never abandoned his post in 15 years of garden service. Not even for biscuits.',
    abilities: { strength: 8, defence: 10, appearance: 6 },
    imageUrl: 'https://placehold.co/300x300?text=Rocky',
    price: 27.99,
  },
  {
    id: 8,
    name: 'Sparkle the Sentinel',
    description: 'Gleaming with enchanted glitter, Sparkle\'s radiant shine blinds and baffles bugs. She also doubles as a garden feature at parties.',
    abilities: { strength: 5, defence: 6, appearance: 9 },
    imageUrl: 'https://placehold.co/300x300?text=Sparkle',
    price: 23.99,
  },
];

@Injectable({ providedIn: 'root' })
export class GnomeService {
  private readonly _gnomes = signal<Gnome[]>(SEED_GNOMES);

  readonly gnomes = this._gnomes.asReadonly();

  getById(id: number): Gnome | undefined {
    return this._gnomes().find((g) => g.id === id);
  }

  update(updated: Gnome): void {
    this._gnomes.update((gnomes) =>
      gnomes.map((g) => (g.id === updated.id ? { ...updated } : g))
    );
  }
}
