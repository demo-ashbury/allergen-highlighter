const test = require("node:test");
const assert = require("node:assert");
const { findAllergens, highlightAllergens } = require("./allergens.js");

test("finds milk and wheat in a simple list", () => {
  const result = findAllergens("Wheat flour, water, butter, salt");
  assert.deepStrictEqual(result, ["Cereals containing gluten", "Milk"]);
});

test("returns no allergens for a list without any", () => {
  assert.deepStrictEqual(findAllergens("Water, sugar, salt"), []);
});

test("wraps allergen words in bold", () => {
  assert.strictEqual(highlightAllergens("Egg, sugar"), "<strong>Egg</strong>, sugar");
});

test("escapes HTML in the ingredients text", () => {
  assert.ok(highlightAllergens("<b>salt</b>").includes("&lt;b&gt;"));
});
