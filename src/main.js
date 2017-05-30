/*Require libs*/
const fetch = require('node-fetch');
const{
    compose,
    prop,
    sortBy,
    head,
    reverse,
    isEmpty,
    not
} = require('ramda');

/*Constant*/
const API_BASE_URL = "https://static.everyplay.com/developer-quiz/data";

/*Utils*/
async function fetchUrl(url = "") {
    const response = await fetch(`${url}`);
    const body = await response.json();

    if(response.status !== 200) {
        throw Error(body.message);
    }

    return body;
}

export const isNotEmpty = compose(not, isEmpty);
export const getProp = (name) => prop(name);
export const getConversationId = getProp('id');
export const getFromUserId = getProp('from_user_id');
export const sortByCreatedTime = sortBy(getProp('created_at'));
export const getLatestMessages = compose(
    head,
    reverse,
    sortByCreatedTime
);
export const buildSummary = (
    conversation = {id: -1},
    user = {id: -1, avatar_url: ""},
    message = {created_at: null, body: "", id: -1}
) => ({
    id : conversation.id,
    latest_message : {
        id : message.id,
        body : message.body,
        from_user : {
            id : user.id,
            avatar_url : user.avatar_url
        },
        created_at : message.created_at
    }
});
export const buildEmptySummary = (conversation = {id: -1}) => ({
    id : conversation.id,
    latest_message: {}
});

/*main*/
async function getRecentConversationSummaries() {
    try {
        const conversations = await fetchUrl(`${API_BASE_URL}/conversations`);
        if (!isNotEmpty(conversations)) {
            return [];
        }

        return await Promise.all(
            conversations.map(
                async (conv) => {
                    const messages = await fetchUrl(`${API_BASE_URL}/conversations/${getConversationId(conv)}/messages`);
                    if(!isNotEmpty(messages)) {
                        return buildEmptySummary(conv);
                    }
                    const latestMessage = getLatestMessages(messages);
                    const user = await fetchUrl(`${API_BASE_URL}/users/${getFromUserId(latestMessage)}`);

                    return buildSummary(conv, user, latestMessage);
                }
            )
        );
    } catch(err) {
        console.error(err);
        throw err;
    }

}

export default getRecentConversationSummaries;
