/**
 * WhatsApp Automation Utility Functions
 * 
 * These functions provide helper methods for common WhatsApp operations.
 * Import the client from index.js separately and pass it to these functions,
 * or use the provided factory function to create utilities bound to a client.
 */

/**
 * Send a message to a specific phone number
 * @param {Object} client - WhatsApp client instance
 * @param {string} phoneNumber - Phone number in international format without + or spaces
 *                                (e.g., '1234567890' where 1 is country code and 234567890 is the number)
 *                                For US number (123) 456-7890, use: '11234567890'
 * @param {string} message - Message text to send
 */
async function sendMessage(client, phoneNumber, message) {
    try {
        // Format: countrycode + number + @c.us (no + sign or spaces in phoneNumber)
        const chatId = `${phoneNumber}@c.us`;
        await client.sendMessage(chatId, message);
        console.log(`Message sent to ${phoneNumber}: ${message}`);
    } catch (error) {
        console.error(`Failed to send message to ${phoneNumber}:`, error);
    }
}

/**
 * Send a message to a group
 * @param {Object} client - WhatsApp client instance
 * @param {string} groupId - Group ID
 * @param {string} message - Message text to send
 */
async function sendGroupMessage(client, groupId, message) {
    try {
        await client.sendMessage(groupId, message);
        console.log(`Message sent to group ${groupId}: ${message}`);
    } catch (error) {
        console.error(`Failed to send message to group ${groupId}:`, error);
    }
}

/**
 * Get all chats
 * @param {Object} client - WhatsApp client instance
 * @returns {Promise<Array>} Array of chats
 */
async function getChats(client) {
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
 * @param {Object} client - WhatsApp client instance
 * @returns {Promise<Array>} Array of contacts
 */
async function getContacts(client) {
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
 * @param {Object} client - WhatsApp client instance
 * @param {string} phoneNumber - Phone number
 * @returns {Promise<Object|null>} Chat object or null
 */
async function getChatByNumber(client, phoneNumber) {
    try {
        const chatId = `${phoneNumber}@c.us`;
        const chat = await client.getChatById(chatId);
        return chat;
    } catch (error) {
        console.error(`Failed to get chat for ${phoneNumber}:`, error);
        return null;
    }
}

/**
 * Create utility functions bound to a specific client
 * This factory function returns an object with all utility functions
 * pre-bound to the provided client instance.
 * 
 * @param {Object} client - WhatsApp client instance
 * @returns {Object} Object with utility functions
 */
function createUtils(client) {
    return {
        sendMessage: (phoneNumber, message) => sendMessage(client, phoneNumber, message),
        sendGroupMessage: (groupId, message) => sendGroupMessage(client, groupId, message),
        getChats: () => getChats(client),
        getContacts: () => getContacts(client),
        getChatByNumber: (phoneNumber) => getChatByNumber(client, phoneNumber)
    };
}

module.exports = {
    sendMessage,
    sendGroupMessage,
    getChats,
    getContacts,
    getChatByNumber,
    createUtils
};
