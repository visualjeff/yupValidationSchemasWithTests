import { object } from "yup";
import {
  firstName,
  zipCode,
  city,
  email,
  confirmEmail,
  phoneNumber,
  aptSuiteUnitEtc
} from "./validationSchemas";

describe("validation schema tests for firstName", () => {
  it("firstName happy path", async () => {
    expect(await firstName.validate("jeff")).toBeTruthy();
  });
  it("firstName required", async () => {
    await firstName.validate("").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid first name.");
    });
  });
  it("firstName no numbers", async () => {
    await firstName.validate("123").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid first name.");
    });
  });
  it("firstName No special characters, except apostrophe, hyphens", async () => {
    await firstName.validate("'").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid first name.");
    });
    expect(await firstName.validate("'")).toBeTruthy();
    expect(await firstName.validate("-")).toBeTruthy();
  });
});

describe("validation schema tests for zipCode", () => {
  it("zipCode happy path", async () => {
    expect(await zipCode.validate("98136")).toBeTruthy();
    expect(await zipCode.validate("98136-1234")).toBeTruthy();
  });
  it("zipCode required", async () => {
    await zipCode.validate("").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid ZIP Code.");
    });
  });
  it("zipCode only numeric characters", async () => {
    await zipCode.validate("abc").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid ZIP Code.");
    });
  });
  it("zipCode no special characters", async () => {
    await zipCode.validate("*&").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid ZIP Code.");
    });
  });
});

describe("validation schema tests for city", () => {
  it("city happy path", async () => {
    expect(await city.validate("Seattle")).toBeTruthy();
  });

  it("city no special characters", async () => {
    await city.validate("'").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid city.");
    });
  });
});

describe("validation schema tests for email", () => {
  it("email happy path", async () => {
    expect(await email.validate("test@seattle.com")).toBeTruthy();
  });

  it("email unhappy path", async () => {
    await email.validate("test@").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid email address.");
    });
  });

  it("email required", async () => {
    await email.validate("").catch(function (err) {
      expect(err.message).toStrictEqual("Email address is required.");
    });
  });
});

describe("validation schema tests for confirmEmail", () => {
  const confirmEmailValidationSchema = object({
    email,
    confirmEmail
  });
  it("confirmEmail happy path", async () => {
    expect(
      await confirmEmailValidationSchema.validate({
        email: "test@seattle.com",
        confirmEmail: "test@seattle.com"
      })
    ).toBeTruthy();
  });
  it("confirmEmail unhappy path", async () => {
    await confirmEmailValidationSchema
      .validate({
        email: "test1@seattle.com",
        confirmEmail: "test2@seattle.com"
      })
      .catch(function (err) {
        expect(err.message).toStrictEqual("Email addresses do not match.");
      });
  });
});

describe("validation schema tests for phoneNumber", () => {
  it("phoneNumber happy path", async () => {
    expect(await phoneNumber.validate("2065044277")).toBeTruthy();
    expect(await phoneNumber.validate("206-5044277")).toBeTruthy();
    expect(await phoneNumber.validate("206-504-4277")).toBeTruthy();
  });

  it("phoneNumber unhappy", async () => {
    await phoneNumber.validate("5044277").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid 10-digit phone number.");
    });
    await phoneNumber.validate("12065044277").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid 10-digit phone number.");
    });
    await phoneNumber.validate("02065044277").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid 10-digit phone number.");
    });
    await phoneNumber.validate("WES5044277").catch(function (err) {
      expect(err.message).toStrictEqual("Enter a valid 10-digit phone number.");
    });
  });
});

describe("validation schema tests for Apt. Suite, Unit, Etc...", () => {
  it("aptSuiteUnitEtc happy path", async () => {
    expect(await aptSuiteUnitEtc.validate("Suite 101")).toBeTruthy();
  });

  it("aptSuiteUnitEtc no special characters", async () => {
    await aptSuiteUnitEtc.validate("'").catch(function (err) {
      expect(err.message).toStrictEqual(
        "Enter a valid Apt., Suite, Unit, Etc."
      );
    });
  });
});
