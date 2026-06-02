# KATA - WhatsApp Multi-Device Bot

KATA is a powerful and modular WhatsApp Multi-Device bot built with Node.js and the Baileys library. It supports a wide range of commands, including general utilities, group management, and media downloaders.

## Features

*   **Multi-Device Support:** Connects to WhatsApp using the multi-device feature.
*   **Modular Command System:** Each command is in its own file, making it easy to add, remove, or modify commands.
*   **Plugin Loader:** Dynamically loads commands from the `commands` directory.
*   **Command Handler:** Processes incoming messages and executes the corresponding commands.
*   **Event Handler:** Manages various WhatsApp events.
*   **Configuration File:** Easy-to-use `config/config.js` for bot settings.
*   **Environment Variable Support:** Uses `.env` for sensitive information and flexible deployment.
*   **Logging System:** Detailed logging using `pino` for better debugging and monitoring.
*   **Error Handling:** Robust error handling to prevent bot crashes.
*   **Cooldown System:** Prevents command spamming.
*   **Permission System:** Granular control over command usage (owner, admin, group, public).
*   **Menu System:** Stylish and categorized command menu.
*   **Modern JavaScript:** Written entirely in ES6+.

## Folder Structure

```
KATA/
├── commands/             # Individual command files
├── events/               # Event handlers
├── lib/                  # Core bot libraries (connection, handler, logger, database, permissions, cooldown, pluginLoader, eventHandler)
├── database/             # Database files (e.g., JSON database)
├── config/               # Configuration files
├── plugins/              # Future plugin support
├── media/                # Stored media (e.g., downloaded files)
├── temp/                 # Temporary files
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── Dockerfile            # Docker configuration for containerization
├── index.js              # Main bot entry point
├── package.json          # Project dependencies and scripts
├── Procfile              # For Heroku-like deployments (e.g., Railway, Koyeb)
├── README.md             # This file
└── render.yaml           # Render deployment configuration
```

## Commands

### General

*   `ping`: Checks bot responsiveness and latency.
*   `menu` / `help`: Displays the bot's command menu.
*   `uptime` / `up`: Shows how long the bot has been running.
*   `owner` / `creator`: Displays the bot owner's contact information.
*   `alive` / `botstatus`: Checks if the bot is alive and responsive, showing uptime and basic info.
*   `active` / `activechats`: Lists active chats the bot is participating in.

### Group

*   `promote`: Promotes a user to admin in a group.
*   `demote`: Demotes an admin to a regular member in a group.
*   `kick` / `remove`: Removes a user from a group.
*   `add`: Adds a user to a group.
*   `tagall` / `everyone`: Tags all members in a group.
*   `hidetag` / `ht`: Sends a message without tagging everyone (admin only).
*   `mute`: Mutes the group (only admins can send messages).
*   `unmute`: Unmutes the group (all members can send messages).

### Utility

*   `font` / `fancytext`: Converts text to fancy fonts.
*   `sticker` / `s` / `stiker`: Converts an image or video to a WhatsApp sticker.
*   `qr`: Generates a QR code from text.
*   `shorturl` / `shorten`: Shortens a given URL.
*   `calculate` / `calc` / `math`: Performs basic arithmetic calculations.

### Downloader Commands

*   `tt` / `tiktok`: Downloads TikTok videos without watermark.
*   `yt` / `youtube` / `ytaudio` / `ytvideo` / `yta` / `ytv`: Downloads YouTube videos or audio.
*   `insta` / `instagram`: Downloads Instagram posts (images/videos).
*   `fb` / `facebook`: Downloads Facebook videos.
*   `play` / `music`: Searches for and downloads music (placeholder).

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/KATA.git
    cd KATA
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Rename `.env.example` to `.env` and fill in your details.
    ```bash
    cp .env.example .env
    ```
    Edit `.env`:
    ```
    BOT_NAME=KATA
    PREFIX=!
    OWNER_NUMBER=2348012345678 # Your WhatsApp number with country code, without +
    LOG_LEVEL=info
    DATABASE_URL=./database/database.json
    ```

4.  **Start the bot:**
    ```bash
    npm start
    ```
    Or for development with auto-restart:
    ```bash
    npm run dev
    ```

    Scan the QR code displayed in the terminal using your WhatsApp linked devices feature.

## Deployment

KATA is designed for easy deployment on various platforms.

### Render

1.  Fork this repository to your GitHub account.
2.  Go to your Render Dashboard and click "New Web Service".
3.  Connect your GitHub account and select the forked KATA repository.
4.  Render will automatically detect the `render.yaml` file and configure the service. Ensure the `OWNER_NUMBER` environment variable is set correctly.
5.  Deploy the service.

### Railway

1.  Fork this repository to your GitHub account.
2.  Go to your Railway Dashboard and click "New Project" -> "Deploy from GitHub Repo".
3.  Select the forked KATA repository.
4.  Railway will detect the `Procfile` and `package.json`. Configure environment variables (e.g., `BOT_NAME`, `PREFIX`, `OWNER_NUMBER`, `LOG_LEVEL`) in the project settings.
5.  Deploy the service.

### Koyeb

1.  Fork this repository to your GitHub account.
2.  Go to your Koyeb Dashboard and click "Create App".
3.  Select "GitHub" as the deployment method and choose the forked KATA repository.
4.  Koyeb will detect the `Procfile` and `package.json`. Configure environment variables in the deployment settings.
5.  Deploy the service.

### VPS (Virtual Private Server)

1.  SSH into your VPS.
2.  Install Node.js (v18+ recommended) and npm.
3.  Clone your forked KATA repository:
    ```bash
    git clone https://github.com/your-username/KATA.git
    cd KATA
    ```
4.  Install dependencies:
    ```bash
    npm install
    ```
5.  Configure your `.env` file as described in the Installation section.
6.  Use a process manager like `pm2` to keep the bot running:
    ```bash
    npm install -g pm2
    pm2 start index.js --name 
KATA
    ```
    To view logs:
    ```bash
    pm2 logs KATA
    ```

### GitHub Actions (Self-hosted Runner)

For continuous deployment or integration using GitHub Actions, you can set up a self-hosted runner on your VPS or a dedicated machine.

1.  **Set up a self-hosted runner:** Follow GitHub's official documentation to set up a self-hosted runner on your server.
2.  **Create a workflow file:** In your repository, create a `.github/workflows/deploy.yml` file:
    ```yaml
    name: Deploy KATA Bot

    on: 
      push:
        branches:
          - main

    jobs:
      deploy:
        runs-on: self-hosted
        steps:
          - name: Checkout repository
            uses: actions/checkout@v3

          - name: Set up Node.js
            uses: actions/setup-node@v3
            with:
              node-version: '20'

          - name: Install dependencies
            run: npm install

          - name: Restart PM2 process
            run: |
              pm2 delete KATA || true
              pm2 start index.js --name KATA
            env:
              BOT_NAME: ${{ secrets.BOT_NAME }}
              PREFIX: ${{ secrets.PREFIX }}
              OWNER_NUMBER: ${{ secrets.OWNER_NUMBER }}
              LOG_LEVEL: ${{ secrets.LOG_LEVEL }}
              DATABASE_URL: ${{ secrets.DATABASE_URL }}
    ```
3.  **Configure GitHub Secrets:** Add your environment variables (e.g., `BOT_NAME`, `PREFIX`, `OWNER_NUMBER`, `LOG_LEVEL`, `DATABASE_URL`) as secrets in your GitHub repository settings (`Settings > Secrets > Actions`).
4.  **Push to main:** Any push to the `main` branch will trigger the deployment workflow.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
