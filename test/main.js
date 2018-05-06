const { code128 } = require('./../src/index');
const expect = require('chai').expect;

describe('Generator Code 128', () => {
    it('Test wikipedia example', () => {
        expect(code128('PJJ123C')).to.equal('ËPJJ123CVÎ');
    });
});
