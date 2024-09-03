type ReleaseKind = "major" | "minor" | "patch";

const SEMVER_RE = /^\d+\.\d+\.\d+$/;

/**
 * A simple class to handle Semver versions.
 *
 * @example
 * const version = new Semver("1.2.3");
 *
 * version.major; // 1
 * version.minor; // 2
 * version.patch; // 3
 *
 * version.nextRelease("major"); // "2.0.0"
 *
 * version.toString(); // "1.2.3"
 *
 * @see https://semver.org/
 *
 * @param version - A valid Semver version string.
 * @throws Will throw an error if the version string is invalid.
 * @returns A Semver instance.
 */
export class Semver {
  major: number;
  minor: number;
  patch: number;

  constructor(version: string) {
    if (!Semver.isValid(version)) {
      throw new Error("Invalid Semver version");
    }

    const [major, minor, patch] = version.split(".").map(Number);
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  nextRelease(kind: ReleaseKind): string {
    switch (kind) {
      case "major":
        return `${this.major + 1}.0.0`;
      case "minor":
        return `${this.major}.${this.minor + 1}.0`;
      case "patch":
        return `${this.major}.${this.minor}.${this.patch + 1}`;
      default:
        throw new Error("Invalid Semver version");
    }
  }

  toString(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  static isValid(version: string): boolean {
    return SEMVER_RE.test(version);
  }
}
