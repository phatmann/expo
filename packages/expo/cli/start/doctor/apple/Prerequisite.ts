import { CommandError, UnimplementedError } from '../../../utils/errors';
import { memoize } from '../../../utils/fn';

export class PrerequisiteCommandError extends CommandError {
  constructor(code: string, message: string = '') {
    super(message ? 'VALIDATE_' + code : code, message);
  }
}

export class Prerequisite {
  /** Memoized results of `assertImplementation` */
  private _assertAsync: () => Promise<void>;

  constructor() {
    this._assertAsync = memoize(this.assertImplementation);
  }

  /** An optional warning to call before running the memoized assertion.  */
  protected cachedError?: PrerequisiteCommandError;

  /** Reset the assertion memo and warning message. */
  protected resetAssertion() {
    this.cachedError = undefined;
    this._assertAsync = memoize(this.assertImplementation);
  }

  async assertAsync(): Promise<void> {
    if (this.cachedError) {
      throw this.cachedError;
    }
    try {
      return await this._assertAsync();
    } catch (error) {
      if (error instanceof PrerequisiteCommandError) {
        this.cachedError = error;
      }
      throw error;
    }
  }

  /** Exposed for testing. */
  async assertImplementation(): Promise<void> {
    throw new UnimplementedError();
  }
}

export class ProjectPrerequisite extends Prerequisite {
  constructor(protected projectRoot: string) {
    super();
  }
}
