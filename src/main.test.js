import getRecentConversationSummaries, * as lib from './main';

test('it should run test', () => {
   expect(true).toEqual(true);
});

describe('utils', () => {

   test('isNotEmpty', () => {
       const {isNotEmpty} = lib;
       const empty = [];
       const ary = [1,2,3];
       const result = isNotEmpty(empty);
       const result2 = isNotEmpty(ary);
       expect(result).toBe(false);
       expect(result2).toBe(true);
   });

   test('getProp: get prop from an obj', () => {
      const {getProp} = lib;
      const obj = {name: 'joe'};
      const getName = getProp('name');
      const result = getName(obj);
      const expected = 'joe';
      expect(result).toBe(expected);
   });

    test('getProp: return undefined there is not prop', () => {
        const {getProp} = lib;
        const obj = {name: 'joe'};
        const getName = getProp('nothisprop');
        const result = getName(obj);
        const expected = undefined;
        expect(result).toBe(expected);
    });

    test('getConversationId: get id from obj', () => {
        const {getConversationId} = lib;
        const obj = {name: 'joe', id: 123};
        const result = getConversationId(obj);
        const expected = 123;
        expect(result).toBe(expected);
    });

    test('getConversationId: return undefined if there is no id prop', () => {
        const {getConversationId} = lib;
        const obj = {name: 'joe'};
        const result = getConversationId(obj);
        const expected = undefined;
        expect(result).toBe(expected);
    });

    test('getFromUserId: get from_user_id from obj', () => {
        const {getFromUserId} = lib;
        const obj = {name: 'joe', from_user_id: 123};
        const result = getFromUserId(obj);
        const expected = 123;
        expect(result).toBe(expected);
    });

    test('getFromUserId: return undefined if there is no from_user_id prop', () => {
        const {getFromUserId} = lib;
        const obj = {name: 'joe'};
        const result = getFromUserId(obj);
        const expected = undefined;
        expect(result).toBe(expected);
    });

    test('sortByCreatedTime: should sort array by created_at prop', () => {
       const {sortByCreatedTime} = lib;
       const ary = [
           {created_at: '2016-08-25T10:15:00.670Z', name: 'Aug'},
           {created_at: '2016-06-25T10:15:00.670Z', name: 'June'},
           {created_at: '2016-07-25T10:15:00.670Z', name: 'July'}
       ];
       const result = sortByCreatedTime(ary);
       const expected = [
           {created_at: '2016-06-25T10:15:00.670Z', name: 'June'},
           {created_at: '2016-07-25T10:15:00.670Z', name: 'July'},
           {created_at: '2016-08-25T10:15:00.670Z', name: 'Aug'}
       ];
       expect(result).toEqual(expected)
    });

    test('getLatestMessages: Get the last element from a sorted AESC array', () => {
        const {getLatestMessages} = lib;
        const ary = [
            {created_at: '2016-08-25T10:15:00.670Z', name: 'Aug'},
            {created_at: '2016-06-25T10:15:00.670Z', name: 'June'},
            {created_at: '2016-07-25T10:15:00.670Z', name: 'July'}
        ];
        const ary2 = [
            {created_at: '2016-06-25T10:15:00.670Z', name: 'June'},
            {created_at: '2016-08-25T10:15:00.670Z', name: 'Aug'},
            {created_at: '2016-07-25T10:15:00.670Z', name: 'July'}
        ];
        const result = getLatestMessages(ary);
        const result2 = getLatestMessages(ary2);
        const result3 = getLatestMessages([]);
        const expected = {created_at: '2016-08-25T10:15:00.670Z', name: 'Aug'};
        const expected2 = {created_at: '2016-08-25T10:15:00.670Z', name: 'Aug'};
        const expected3 = undefined;
        expect(result).toEqual(expected);
        expect(result2).toEqual(expected2);
        expect(result3).toEqual(expected3);
    });

    test('isNotEmpty', () => {
        const {isNotEmpty} = lib;
        const empty = [];
        const notEmpty = [1,2];
        expect(isNotEmpty(empty)).toBe(false);
        expect(isNotEmpty(notEmpty)).toBe(true);
    });

    test('get the result', async () => {
        const result = await getRecentConversationSummaries();
        const expected = [
            {
                id: "1",
                latest_message: {
                    id: "1",
                    body: "Moi!",
                    from_user: {
                        id: "1",
                        avatar_url: "http://placekitten.com/g/300/300",
                    },
                    created_at: "2016-08-25T10:15:00.670Z",
                },
            },
            {
                id: "2",
                latest_message: {
                    id: "2",
                    body: "Hello!",
                    from_user: {
                        id: "3",
                        avatar_url: "http://placekitten.com/g/302/302",
                    },
                    created_at: "2016-08-24T10:15:00.670Z",
                },
            },
            {
                id: "3",
                latest_message: {
                    id: "3",
                    body: "Hi!",
                    from_user: {
                        id: "1",
                        avatar_url: "http://placekitten.com/g/300/300",
                    },
                    created_at: "2016-08-23T10:15:00.670Z",
                },
            },
            {
                id: "4",
                latest_message: {
                    id: "4",
                    body: "Morning!",
                    from_user: {
                        id: "5",
                        avatar_url: "http://placekitten.com/g/304/304",
                    },
                    created_at: "2016-08-22T10:15:00.670Z",
                },
            },
            {
                id: "5",
                latest_message: {
                    id: "5",
                    body: "Pleep!",
                    from_user: {
                        id: "6",
                        avatar_url: "http://placekitten.com/g/305/305",
                    },
                    created_at: "2016-08-21T10:15:00.670Z",
                },
            },
        ];
        expect(result).toEqual(expected);
    });


});
