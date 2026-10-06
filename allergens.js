// Allergen detection for UK food labels.
// Each allergen has a display name and the words that indicate it in an ingredients list.

const ALLERGENS = [
  { name: "Celery", keywords: ["celery", "celeriac"] },
  { name: "Cereals containing gluten", keywords: ["wheat", "rye", "barley", "oats", "oat", "spelt", "kamut"] },
  { name: "Crustaceans", keywords: ["crab", "lobster", "prawn", "prawns", "shrimp", "crayfish", "langoustine"] },
  { name: "Eggs", keywords: ["egg", "eggs"] },
  { name: "Fish", keywords: ["fish", "anchovy", "anchovies", "cod", "salmon", "tuna", "haddock"] },
  { name: "Lupin", keywords: ["lupin"] },
  { name: "Milk", keywords: ["milk", "butter", "cream", "cheese", "yoghurt", "whey", "lactose"] },
  { name: "Molluscs", keywords: ["mussel", "mussels", "oyster", "oysters", "squid", "clam", "clams", "scallop", "scallops"] },
  { name: "Mustard", keywords: ["mustard"] },
  { name: "Tree nuts", keywords: ["almond", "almonds", "hazelnut", "hazelnuts", "walnut", "walnuts", "cashew", "cashews", "pecan", "pecans", "pistachio", "pistachios", "macadamia"] },
  { name: "Peanuts", keywords: ["peanut", "peanuts", "groundnut", "groundnuts"] },
  { name: "Soya", keywords: ["soya", "soy", "soybean", "soybeans"] },
  { name: "Sulphites", keywords: ["sulphite", "sulphites", "sulphur dioxide", "sulfite", "sulfites"] }
];

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPattern() {
  const words = ALLERGENS.flatMap(a => a.keywords).sort((a, b) => b.length - a.length);
  const escaped = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp("\\b(" + escaped.join("|") + ")\\b", "gi");
}

// Returns the names of allergens found in the text, in the order they are listed above.
function findAllergens(text) {
  const lower = text.toLowerCase();
  return ALLERGENS
    .filter(a => a.keywords.some(k => new RegExp("\\b" + k + "\\b", "i").test(lower)))
    .map(a => a.name);
}

// Returns the ingredients as HTML with every allergen word wrapped in <strong>.
function highlightAllergens(text) {
  return escapeHtml(text).replace(buildPattern(), "<strong>$1</strong>");
}

if (typeof module !== "undefined") {
  module.exports = { ALLERGENS, findAllergens, highlightAllergens };
}
