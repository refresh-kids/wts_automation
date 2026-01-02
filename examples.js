const client = require('./index');
const { sendMessage, getChats } = require('./utils');

// Wait for client to be ready before running examples
client.on('ready', async () => {
    console.log('\n=== Running Example Scripts ===\n');
    
    // Example 1: List all chats
    console.log('Example 1: Getting all chats...');
    const chats = await getChats();
    chats.slice(0, 5).forEach(chat => {
        console.log(`- ${chat.name} (${chat.id._serialized})`);
    });
    
    // Example 2: Send a message (uncomment and modify to use)
    // await sendMessage('1234567890', 'Hello from WhatsApp automation!');
    
    // Example 3: Broadcast message to multiple contacts (uncomment to use)
    /*
    const phoneNumbers = ['1234567890', '0987654321'];
    for (const number of phoneNumbers) {
        await sendMessage(number, 'This is a broadcast message!');
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    */
    
    console.log('\n=== Examples completed ===\n');
    console.log('Client is running. Send messages to test auto-reply features.');
    console.log('Press Ctrl+C to exit.');
});
