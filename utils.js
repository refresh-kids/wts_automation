const client = require('./index');

/**
 * Send a message to a specific phone number
 * @param {string} phoneNumber - Phone number in format: countrycode+number (e.g., '1234567890')
 * @param {string} message - Message text to send
 */
async function sendMessage(phoneNumber, message) {
    try {
        // Format: countrycode + number + @c.us
        const chatId = `${phoneNumber}@c.us`;
        await client.sendMessage(chatId, message);
        console.log(`Message sent to ${phoneNumber}: ${message}`);
    } catch (error) {
        console.error(`Failed to send message to ${phoneNumber}:`, error);
    }
}

/**
 * Send a message to a group
 * @param {string} groupId - Group ID
 * @param {string} message - Message text to send
 */
async function sendGroupMessage(groupId, message) {
    try {
        await client.sendMessage(groupId, message);
        console.log(`Message sent to group ${groupId}: ${message}`);
    } catch (error) {
        console.error(`Failed to send message to group ${groupId}:`, error);
    }
}

/**
 * Get all chats
 * @returns {Promise<Array>} Array of chats
 */
async function getChats() {
    try {
        const chats = await client.getChats();
        console.log(`Found ${chats.length} chats`);
        return chats;
    } catch (error) {
        console.error('Failed to get chats:', error);
        return [];
    }
}

/**
 * Get all contacts
 * @returns {Promise<Array>} Array of contacts
 */
async function getContacts() {
    try {
        const contacts = await client.getContacts();
        console.log(`Found ${contacts.length} contacts`);
        return contacts;
    } catch (error) {
        console.error('Failed to get contacts:', error);
        return [];
    }
}

/**
 * Get chat by phone number
 * @param {string} phoneNumber - Phone number
 * @returns {Promise<Object|null>} Chat object or null
 */
async function getChatByNumber(phoneNumber) {
    try {
        const chatId = `${phoneNumber}@c.us`;
        const chat = await client.getChatById(chatId);
        return chat;
    } catch (error) {
        console.error(`Failed to get chat for ${phoneNumber}:`, error);
        return null;
    }
}

module.exports = {
    sendMessage,
    sendGroupMessage,
    getChats,
    getContacts,
    getChatByNumber
};
