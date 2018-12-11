const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var message = {
            from: 'nolan',
            text: 'generateMessage test text'
        }
        var resultMessage = generateMessage(message.from, message.text);

        expect(resultMessage).toMatchObject({
            from: message.from,
            text: message.text
        });
        expect(typeof resultMessage.createdAt).toBe('number');
    })
})