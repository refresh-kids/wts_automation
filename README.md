# WhatsApp Automation (wts_automation)

A Node.js-based WhatsApp automation bot using whatsapp-web.js. This bot allows you to automate WhatsApp messaging, handle incoming messages, send automated replies, and manage chats programmatically.

## Features

- 🔐 **Secure Authentication**: Uses WhatsApp Web's QR code authentication
- 💬 **Auto-Reply**: Automatically respond to specific messages
- 📤 **Send Messages**: Send messages to individual contacts or groups
- 📊 **Chat Management**: List and manage chats and contacts
- 🔔 **Event Handling**: Listen to various WhatsApp events
- 🛡️ **Session Persistence**: Maintains authenticated session between restarts

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A WhatsApp account
- Active internet connection

## Installation

1. Clone this repository:
```bash
git clone https://github.com/refresh-kids/wts_automation.git
cd wts_automation
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Copy the example configuration:
```bash
cp config.example.json config.json
```

## Usage

### Basic Usage

1. Start the bot:
```bash
npm start
```

2. Scan the QR code that appears in your terminal with your WhatsApp mobile app:
   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices
   - Tap "Link a Device"
   - Scan the QR code shown in the terminal

3. Once authenticated, the bot will be ready to receive and send messages.

### Running Examples

To run the example scripts:
```bash
node examples.js
```

## API Reference

### Main Functions

All utility functions require the client instance to be passed as the first parameter.

#### `sendMessage(client, phoneNumber, message)`
Send a message to a specific phone number.

```javascript
const client = require('./index');
const { sendMessage } = require('./utils');

// Wait for client to be ready
client.on('ready', async () => {
    // Phone number format: country code + number (no + or spaces)
    await sendMessage(client, '1234567890', 'Hello from automation!');
});
```

#### `sendGroupMessage(client, groupId, message)`
Send a message to a WhatsApp group.

```javascript
const client = require('./index');
const { sendGroupMessage } = require('./utils');

client.on('ready', async () => {
    await sendGroupMessage(client, 'groupId@g.us', 'Hello group!');
});
```

#### `getChats(client)`
Retrieve all chats.

```javascript
const client = require('./index');
const { getChats } = require('./utils');

client.on('ready', async () => {
    const chats = await getChats(client);
    console.log(`Total chats: ${chats.length}`);
});
```

#### `getContacts(client)`
Retrieve all contacts.

```javascript
const client = require('./index');
const { getContacts } = require('./utils');

client.on('ready', async () => {
    const contacts = await getContacts(client);
    console.log(`Total contacts: ${contacts.length}`);
});
```

#### Alternative: Using createUtils Factory

You can also create a utilities object bound to a specific client:

```javascript
const client = require('./index');
const { createUtils } = require('./utils');

client.on('ready', async () => {
    const utils = createUtils(client);
    
    // Now you can use utilities without passing client each time
    await utils.sendMessage('1234567890', 'Hello!');
    const chats = await utils.getChats();
});
```

## Event Handlers

The bot listens to several WhatsApp events:

- **`qr`**: QR code received for authentication
- **`ready`**: Client is ready and authenticated
- **`authenticated`**: Authentication successful
- **`auth_failure`**: Authentication failed
- **`disconnected`**: Client disconnected
- **`message`**: New message received
- **`message_create`**: Message created (sent by you)

## Auto-Reply Examples

The bot includes built-in auto-reply functionality. Modify `index.js` to customize:

```javascript
client.on('message', async (message) => {
    if (message.body.toLowerCase() === 'ping') {
        await message.reply('pong');
    }
});
```

## Configuration

Create a `config.json` file based on `config.example.json` to customize behavior:

```json
{
  "autoReply": {
    "enabled": true,
    "keywords": {
      "ping": "pong",
      "hello": "Hi there!",
      "help": "Type 'ping' to test the bot"
    }
  },
  "settings": {
    "logMessages": true,
    "headless": true
  }
}
```

## Project Structure

```
wts_automation/
├── index.js              # Main bot file
├── utils.js              # Utility functions
├── examples.js           # Example usage scripts
├── package.json          # Project dependencies
├── config.example.json   # Example configuration
├── .gitignore           # Git ignore rules
└── README.md            # Documentation
```

## Troubleshooting

### QR Code Not Appearing
- Ensure you have a stable internet connection
- Check that all dependencies are installed correctly
- Try clearing the `.wwebjs_auth` folder and restarting

### Authentication Issues
- Make sure you're scanning the QR code within the time limit
- Verify your WhatsApp account is active
- Check for any WhatsApp Web restrictions on your account

### Connection Problems
- Ensure WhatsApp Web is not blocked by your firewall
- Check your internet connection
- Verify that puppeteer can run on your system

## Security Notes

⚠️ **Important Security Considerations:**

- Never commit your `config.json` file with sensitive data
- Keep your `.wwebjs_auth` folder private
- Don't share your authentication session
- Be careful with automated messaging to avoid WhatsApp's spam detection
- Rate limit your messages to avoid being blocked

## Rate Limiting

WhatsApp has rate limits to prevent spam. Best practices:
- Add delays between messages (2-3 seconds)
- Don't send too many messages in a short time
- Avoid sending identical messages to multiple recipients
- Monitor for any warnings from WhatsApp

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Disclaimer

This project is not affiliated with, endorsed by, or sponsored by WhatsApp or Facebook. Use at your own risk. Be sure to comply with WhatsApp's Terms of Service.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Acknowledgments

- Built with [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- QR code display using [qrcode-terminal](https://github.com/gtanner/qrcode-terminal)
