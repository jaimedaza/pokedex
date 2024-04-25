import {
  validatePassword,
  validateEmail,
  convertWeight,
  convertHeight,
} from "../utils";

describe("validatePassword", () => {
  it("returns true for valid password", () => {
    expect(validatePassword("Abcd123!")).toBe(true);
  });

  it("returns false for password without uppercase letter", () => {
    expect(validatePassword("abcd123!")).toBe(false);
  });

  it("returns false for password without number", () => {
    expect(validatePassword("Abcdefgh!")).toBe(false);
  });

  it("returns false for password without special character", () => {
    expect(validatePassword("Abcd1234")).toBe(false);
  });

  it("returns false for password with length less than 6", () => {
    expect(validatePassword("Abc1!")).toBe(false);
  });
});

describe("validateEmail", () => {
  it("returns true for valid email", () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });

  it("returns false for invalid email", () => {
    expect(validateEmail("test@example")).toBe(false);
  });
});

describe("convertWeight", () => {
  it("converts weight to string with KG (whole number)", () => {
    expect(convertWeight(500)).toBe("50 KG");
  });

  it("converts weight to string with KG (decimal)", () => {
    expect(convertWeight(725)).toBe("72.5 KG");
  });

  it("converts weight to string with KG (zero)", () => {
    expect(convertWeight(0)).toBe("0 KG");
  });
});

describe("convertHeight", () => {
  it("converts height to string with M (whole number)", () => {
    expect(convertHeight(170)).toBe("17 M");
  });

  it("converts height to string with M (decimal)", () => {
    expect(convertHeight(185)).toBe("18.5 M");
  });

  it("converts height to string with M (zero)", () => {
    expect(convertHeight(0)).toBe("0 M");
  });
});
