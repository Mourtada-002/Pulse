export interface Watch {
  id: string;
  name: string;
  colorway: string;
  price: number;
  image: string;
}

export const WATCHES: Watch[] = [
  {
    id: "pulse-obsidian",
    name: "PULSE Series 1",
    colorway: "Obsidian Black",
    price: 499,
    image: "/images/watches/watch-black-transparent.png",
  },
  {
    id: "pulse-titanium",
    name: "PULSE Series 1",
    colorway: "Raw Titanium",
    price: 549,
    image: "/images/watches/watch-silver-transparent.png",
  },
  {
    id: "pulse-crimson",
    name: "PULSE Series 1",
    colorway: "Crimson Red",
    price: 499,
    image: "/images/watches/watch-red-transparent.png",
  },
  {
    id: "pulse-alpine",
    name: "PULSE Series 1",
    colorway: "Alpine White",
    price: 499,
    image: "/images/watches/watch-white-transparent.png",
  },
  {
    id: "pulse-volt",
    name: "PULSE Active",
    colorway: "Neon Volt",
    price: 399,
    image: "/images/watches/watch-volt-transparent.png",
  }
];
