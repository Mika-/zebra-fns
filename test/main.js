import rewire from 'rewire';
import { expect } from 'chai';

import {
    code128,
} from './../src/index';

describe('Generators', () => {
    describe('Code 128', () => {
        it('Test codeset selection', () => {
            const lib = rewire('./../src/code128');
            const resolve = lib.__get__('resolveCodeSet');
            const START_CODE_A = lib.__get__('START_CODE_A');
            const START_CODE_B = lib.__get__('START_CODE_B');
            const START_CODE_C = lib.__get__('START_CODE_C');

            expect(resolve('ABCD')).to.equal(START_CODE_A);
            expect(resolve('abcd')).to.equal(START_CODE_B);
            expect(resolve('1234')).to.equal(START_CODE_C);
        });
    });
});
