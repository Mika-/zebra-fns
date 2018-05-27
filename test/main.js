import { expect } from 'chai';

describe('Generator Code 128', () => {
    it('Test wikipedia example', () => {
        expect(code128('PJJ123C')).to.equal('ËPJJ123CVÎ');
import {
    code128,
} from './../src/index';
    });
});
