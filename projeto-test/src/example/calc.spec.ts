export function add(x: number, y: number) {
  return x + y;
}

describe("Inicial test", () => {
  test("add funtion", () => {
    expect(add(1, 2)).toEqual(3);
  });
});
