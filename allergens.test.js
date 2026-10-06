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

test("flags sesame and tahini in houmous", () => {
  const text = "Chickpeas (45%), water, sesame seed paste (tahini), rapeseed oil, lemon juice, garlic, salt";
  assert.deepStrictEqual(findAllergens(text), ["Sesame"]);
  assert.strictEqual(
    highlightAllergens(text),
    "Chickpeas (45%), water, <strong>sesame</strong> seed paste (<strong>tahini</strong>), rapeseed oil, lemon juice, garlic, salt"
  );
});

test("flags tahini on its own as sesame", () => {
  assert.deepStrictEqual(findAllergens("Tahini, lemon juice"), ["Sesame"]);
});

test("escapes HTML in the ingredients text", () => {
  assert.ok(highlightAllergens("<b>salt</b>").includes("&lt;b&gt;"));
});
