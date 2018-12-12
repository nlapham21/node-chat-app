const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var locationMessage = {
            from: 'nolan',
            latitude: 21212121,
            longitude: -12345678
        }
        var resultMessage = generateLocationMessage(locationMessage.from, locationMessage.latitude, locationMessage.longitude);

        expect(resultMessage).toMatchObject({
            from: locationMessage.from,
            url: `https://www.google.com/maps?q=${locationMessage.latitude},${locationMessage.longitude}`
        });
        expect(typeof resultMessage.createdAt).toBe('number');
    })
})