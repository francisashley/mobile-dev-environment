import stately from "./state";

test("state stores values correctly", () => {
  const state = stately();

  state.set("str-var", "String variable!");
  expect(state.get("str-var")).toBe("String variable!");

  state.set("num-var", 12);
  expect(state.get("num-var")).toBe(12);

  state.set("true-bool-var", true);
  expect(state.get("true-bool-var")).toBe(true);

  state.set("false-bool-var", false);
  expect(state.get("false-bool-var")).toBe(false);

  state.set("array-var", [1, 2, 3, 4, 5]);
  expect(state.get("array-var")).toEqual([1, 2, 3, 4, 5]);

  state.set("object-var", { a: "a", b: "b", c: "c" });
  expect(state.get("object-var")).toEqual({ a: "a", b: "b", c: "c" });
});

test("state stores cached values correctly", () => {
  const state = stately();

  state.setCache("str-var", "String variable!");
  expect(state.getCache("str-var")).toBe("String variable!");

  state.setCache("num-var", 12);
  expect(state.getCache("num-var")).toBe(12);

  state.setCache("true-bool-var", true);
  expect(state.getCache("true-bool-var")).toBe(true);

  state.setCache("false-bool-var", false);
  expect(state.getCache("false-bool-var")).toBe(false);

  state.setCache("array-var", [1, 2, 3, 4, 5]);
  expect(state.getCache("array-var")).toEqual([1, 2, 3, 4, 5]);

  state.setCache("object-var", { a: "a", b: "b", c: "c" });
  expect(state.getCache("object-var")).toEqual({ a: "a", b: "b", c: "c" });
});

test("state stores namespaced cached values correctly", () => {
  const state = stately("namespace");
  const state2 = stately();
  const state3 = stately("namespace");

  state.setCache("namespace-var", "Namespaced variable!");

  expect(state.getCache("namespace-var")).toBe("Namespaced variable!");
  expect(state2.getCache("namespace-var")).toBe(null);
  expect(state3.getCache("namespace-var")).toBe("Namespaced variable!");
});

test("state returns default values correctly", () => {
  const state = stately("namespace");

  expect(state.get("non-existant-val", { defaultValue: "cars" })).toBe("cars");
  expect(state.getCache("non-existant-namespaced-val", "hi")).toBe("hi");
});
