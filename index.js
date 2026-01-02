const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize WhatsApp client with local authentication
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Generate QR code for authentication
client.on('qr', (qr) => {
    console.log('QR Code received. Please scan with your WhatsApp mobile app:');
    qrcode.generate(qr, { small: true });
});

// Client is ready
client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
    console.log('You can now send and receive messages.');
});

// Authentication successful
client.on('authenticated', () => {
    console.log('Authentication successful!');
});

// Authentication failure
client.on('auth_failure', (msg) => {
    console.error('Authentication failure:', msg);
});

// Client disconnected
client.on('disconnected', (reason) => {
    console.log('Client was disconnected:', reason);
});

// Handle incoming messages
client.on('message', async (message) => {
    console.log(`Message from ${message.from}: ${message.body}`);
    
    // Example: Auto-reply to specific messages
    if (message.body.toLowerCase() === 'ping') {
        await message.reply('pong');
    }
    
    // Example: Reply with info command
    if (message.body.toLowerCase() === '!help') {
        await message.reply('Available commands:\n- ping: Test bot response\n- !help: Show this help message');
    }
});

// Handle message creation (sent messages)
client.on('message_create', (message) => {
    // This includes messages sent by you
    if (message.fromMe) {
        console.log(`You sent: ${message.body}`);
    }
});

// Initialize the client
console.log('Initializing WhatsApp Web client...');
client.initialize();

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await client.destroy();
    process.exit(0);
});

// Export client for use in other modules
module.exports = client;
