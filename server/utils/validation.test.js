const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var testString = 1234
        var result = isRealString(testString);

        expect(result).toBe(false);
    })

    it('should reject strings with only spaces', () => {
        var testString = '     '
        var result = isRealString(testString);

        expect(result).toBe(false);
    })

    it('should allow strings with non-space characters', () => {
        var testString = '  its over anakin   '
        var result = isRealString(testString);

        expect(result).toBe(true);
    })
})