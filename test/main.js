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

        it('Test wikipedia example', () => {
            expect(code128('PJJ123C')).to.equal('1101000010011101110110101101110001011011100010011100110110011100101100101110010001000110111010110001100011101011');
        });

        it('Test codeset A', () => {
            expect(code128('ABCD')).to.equal('1101000010010100011000100010110001000100011010110001000110001000101100011101011');
        });

        it('Test codeset B', () => {
            expect(code128('abcd')).to.equal('1101001000010010110000100100001101000010110010000100110110111011101100011101011');
        });

        it('Test codeset C', () => {
            expect(code128('1234')).to.equal('110100111001011001110010001011000100100111101100011101011');
        });
    });
});
