export function formatPrice(change) {
  return (change / 100).toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN"
  });
}

export function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getFunName() {
  const adjectives = [
    "Restauracja",
    "Bar",
    "Fastfood"
  ];

  const nouns = [
    "Hanoi",
    "Sushi",
    "HongKong",
    "Pekin",
    "Tokyo",
    "Vietnam"
  ];

  return `${rand(adjectives)} ${rand(nouns)}`;
}
