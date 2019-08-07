import { expect } from 'chai';

import obj = require('../src/index');

const { describe, it } = global;

describe('obj', (): void => {
    it('works', (): Chal.Assertion => expect(obj).to.be.ok);
});
