const client = require('./index');
const { sendMessage } = require('./utils');

/**
 * Schedule a message to be sent at a specific time
 * @param {string} phoneNumber - Phone number to send to
 * @param {string} message - Message text
 * @param {Date} scheduledTime - When to send the message
 */
function scheduleMessage(phoneNumber, message, scheduledTime) {
    const now = new Date();
    const delay = scheduledTime.getTime() - now.getTime();
    
    if (delay < 0) {
        console.error('Scheduled time is in the past');
        return;
    }
    
    console.log(`Message scheduled for ${scheduledTime.toLocaleString()}`);
    console.log(`Will be sent in ${Math.round(delay / 1000)} seconds`);
    
    setTimeout(async () => {
        await sendMessage(client, phoneNumber, message);
        console.log('Scheduled message sent!');
    }, delay);
}

/**
 * Send a message with a delay
 * @param {string} phoneNumber - Phone number to send to
 * @param {string} message - Message text
 * @param {number} delaySeconds - Delay in seconds before sending
 */
function sendDelayedMessage(phoneNumber, message, delaySeconds) {
    const scheduledTime = new Date(Date.now() + delaySeconds * 1000);
    scheduleMessage(phoneNumber, message, scheduledTime);
}

/**
 * Broadcast message to multiple recipients with delays
 * @param {Array<string>} phoneNumbers - Array of phone numbers
 * @param {string} message - Message to broadcast
 * @param {number} delayBetweenMessages - Delay in seconds between each message
 */
async function broadcastMessage(phoneNumbers, message, delayBetweenMessages = 2) {
    console.log(`Broadcasting message to ${phoneNumbers.length} recipients...`);
    
    for (let i = 0; i < phoneNumbers.length; i++) {
        const phoneNumber = phoneNumbers[i];
        console.log(`Sending to ${phoneNumber} (${i + 1}/${phoneNumbers.length})`);
        
        try {
            await sendMessage(client, phoneNumber, message);
            
            // Add delay between messages to avoid rate limiting
            if (i < phoneNumbers.length - 1) {
                console.log(`Waiting ${delayBetweenMessages} seconds before next message...`);
                await new Promise(resolve => setTimeout(resolve, delayBetweenMessages * 1000));
            }
        } catch (error) {
            console.error(`Failed to send to ${phoneNumber}:`, error);
        }
    }
    
    console.log('Broadcast completed!');
}

// Wait for client to be ready
client.on('ready', async () => {
    console.log('Advanced features ready!');
    
    // Example usage (uncomment to test):
    
    // Schedule a message for 1 minute from now
    // const futureTime = new Date(Date.now() + 60 * 1000);
    // scheduleMessage('1234567890', 'This is a scheduled message!', futureTime);
    
    // Send a delayed message (10 seconds from now)
    // sendDelayedMessage('1234567890', 'This message was delayed!', 10);
    
    // Broadcast to multiple numbers
    // const recipients = ['1234567890', '0987654321'];
    // await broadcastMessage(recipients, 'Broadcasting this message!', 3);
});

module.exports = {
    scheduleMessage,
    sendDelayedMessage,
    broadcastMessage
};
