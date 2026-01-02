# Quick Start Guide

This is a quick reference for getting started with the WhatsApp automation bot.

## Installation Steps

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/ (v14 or higher)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the bot**
   ```bash
   npm start
   ```

4. **Scan QR code**
   - A QR code will appear in your terminal
   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices > Link a Device
   - Scan the QR code

## Available Commands

- `npm start` - Start the main bot
- `npm run examples` - Run example scripts
- `npm run advanced` - Run advanced features demo
- `npm test` - Run structure tests

## Quick Examples

### Send a Simple Message

```javascript
const client = require('./index');
const { sendMessage } = require('./utils');

client.on('ready', async () => {
    // Replace with actual phone number (country code + number, no + or spaces)
    await sendMessage(client, '1234567890', 'Hello from bot!');
});
```

### Auto-Reply to Messages

The bot already includes auto-reply in `index.js`:

```javascript
client.on('message', async (message) => {
    if (message.body.toLowerCase() === 'ping') {
        await message.reply('pong');
    }
});
```

### Broadcast to Multiple Numbers

```javascript
const client = require('./index');
const { broadcastMessage } = require('./advanced');

client.on('ready', async () => {
    const recipients = ['1234567890', '0987654321'];
    await broadcastMessage(recipients, 'Broadcast message!', 3);
});
```

## Phone Number Format

**Important**: Phone numbers must be in international format without + or spaces.

- ✅ Correct: `'11234567890'` (US number)
- ✅ Correct: `'919876543210'` (India number)
- ❌ Wrong: `'+1 123-456-7890'`
- ❌ Wrong: `'1234567890'` (missing country code)

## Common Issues

1. **QR Code not showing**: Install dependencies with `npm install`
2. **Authentication fails**: Make sure WhatsApp is active on your phone
3. **Messages not sending**: Verify phone number format includes country code

## Rate Limiting

To avoid being blocked:
- Add 2-3 second delays between messages
- Don't send identical messages to many people
- Monitor for any warnings from WhatsApp

## Files Overview

- `index.js` - Main bot with event handlers
- `utils.js` - Helper functions for sending messages
- `advanced.js` - Scheduling and broadcasting features
- `examples.js` - Example usage code
- `test.js` - Structure tests
- `config.example.json` - Configuration template

## Support

For issues or questions, check the main README.md or open an issue on GitHub.
