const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Nolan',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Munchkin',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Kristin',
            room: 'Node Course'
        }]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Nolan',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    })

    it('should remove a user', () => {
        var removedUser = users.removeUser('2');

        expect(removedUser).toEqual({
            id: '2',
            name: 'Munchkin',
            room: 'React Course'
        });
        expect(users.users).toEqual([{
            id: '1',
            name: 'Nolan',
            room: 'Node Course'
        }, {
            id: '3',
            name: 'Kristin',
            room: 'Node Course'
        }]);
    });

    it('should not remove a user', () => {
        var removedUser = users.removeUser('21');

        expect(removedUser).toBeFalsy();
        expect(users.users).toEqual(users.users); 
    });

    it('should find user', () => {
        var foundUser = users.getUser('1');

        expect(foundUser).toEqual({
            id: '1',
            name: 'Nolan',
            room: 'Node Course'
        });
        expect(users.users).toEqual(users.users); 
    });

    it('should not find user', () => {
        var foundUser = users.getUser('21');

        expect(foundUser).toBeFalsy();
        expect(users.users).toEqual(users.users); 
    });

    it('should return names for Node Course room', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Nolan', 'Kristin']);
    });

    it('should return names for React Course room', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Munchkin']);
    });

    it('should not find a user with the same name in room', () => {
        var user = {
            id: '2',
            name: 'Baxter',
            room: 'Node Course'
        };
        var isUsernameTaken = users.isUsernameTaken(user.name, user.room);

        expect(isUsernameTaken).toBe(false);
    });

    it('should find a user with the same name in room', () => {
        var user = {
            id: '2',
            name: 'Nolan',
            room: 'Node Course'
        };
        var isUsernameTaken = users.isUsernameTaken(user.name, user.room);

        expect(isUsernameTaken).toBe(true);
    });

    it('should return a list of rooms', () => {
        var rooms = users.getRoomsList();

        expect(rooms).toEqual(["Node Course", "React Course"]);
    });

    it('should return an empty list of rooms', () => {
        var localUsers = new Users();
        var rooms = localUsers.getRoomsList();

        expect(rooms).toEqual([]);
    });
});