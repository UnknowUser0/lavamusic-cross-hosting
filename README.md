<center><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Lavamusic&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient" /></center>


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/appujet/lavamusic">
    <img src="https://cdn.discordapp.com/avatars/875635121770889257/adc4fd956872a72814b70448d1fddd40.webp?size=512" alt="lavamusic" width="200" height="200">
  </a>

  <h1 align="center">Lavamusic</h1>
  <p align="center">Lavamusic is a Discord music bot that uses Discord.js, lavalink-client, and TypeScript.
    <br />
    <br />
    <a href="https://discord.com/oauth2/authorize?client_id=875635121770889257&scope=bot+applications.commands&permissions=8">Invite Lavamusic</a>
    ·
    <a href="https://github.com/appujet/lavamusic/issues">Report Bug & Request Feature</a>
  </p>
</p>

## 🔥 Unique Features

- User-friendly and Easy to Use
- Highly Configurable
- Customizable Prefix
- Multilingual support [Here](/Translation.md)
- Hybrid Command Handling (Slash and Normal Commands)
- Developed using TypeScript and Discord.js v14
- Advanced Music System
- Powerful Search Engine
- 12 + Music Filters
- 24/7 Music Playback
- Playlist commands
- Music channel system

## 🎶 Support Sources

### 🔍 Default Sources

- ![SoundCloud](https://img.shields.io/badge/SoundCloud-FF3300?style=plastic&logo=soundcloud&logoColor=white)
- ![Twitch](https://img.shields.io/badge/Twitch-9146FF?style=plastic&logo=twitch&logoColor=white)
- ![Bandcamp](https://img.shields.io/badge/Bandcamp-629AA9?style=plastic&logo=bandcamp&logoColor=white)
- ![Vimeo](https://img.shields.io/badge/Vimeo-1AB7EA?style=plastic&logo=vimeo&logoColor=white)
- ![Nico](https://img.shields.io/badge/Nico-FF0066?style=plastic&logo=nico&logoColor=white)
- ![Mixer](https://img.shields.io/badge/Mixer-FFA500?style=plastic&logo=mixer&logoColor=white)
- ![http](https://img.shields.io/badge/http-FFA500?style=plastic&logo=http&logoColor=white)

### 🔌 Plugin Sources

**Note: You need to install the plugins to use these sources**

- ![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=plastic&logo=youtube&logoColor=white) ([Required Plugin][youtube-source])
- ![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=plastic&logo=spotify&logoColor=white) ([Required Plugin][LavaSrc])
- ![Deezer](https://img.shields.io/badge/Deezer-FF0000?style=plastic&logo=deezer&logoColor=white) ([Required Plugin][LavaSrc])
- ![Apple Music](https://img.shields.io/badge/Apple%20Music-000000?style=plastic&logo=apple-music&logoColor=white) ([Required Plugin][LavaSrc])
- ![Yandex Music](https://img.shields.io/badge/Yandex%20Music-FF0066?style=plastic&logo=yandex-music&logoColor=white) ([Required Plugin][LavaSrc])
- ![jiosaavn](https://img.shields.io/badge/jiosaavn-51C4D3?style=plastic&logo=jiosaavn&logoColor=white) ([Required Plugin][Jiosaavn])
- ![Mixcloud](https://img.shields.io/badge/Mixcloud-51C4D3?style=plastic&logo=mixcloud&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
- ![Ocremix](https://img.shields.io/badge/Ocremix-FF6600?style=plastic&logo=ocremix&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
- ![Clyp](https://img.shields.io/badge/Clyp-6BB5A6?style=plastic&logo=clyp&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
- ![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=plastic&logo=reddit&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
- ![Getyarn](https://img.shields.io/badge/Getyarn-FF9000?style=plastic&logo=getyarn&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
- ![TikTok](https://img.shields.io/badge/TikTok-FF2D55?style=plastic&logo=tiktok&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
- ![Soundgasm](https://img.shields.io/badge/Soundgasm-F1672F?style=plastic&logo=soundgasm&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])
- ![Text To Speech](https://img.shields.io/badge/Text%20To%20Speech-3080ff?style=plastic&logo=google-translate&logoColor=white) ([Required Plugin][skybot-lavalink-plugin])

[LavaSrc]: https://github.com/topi314/LavaSrc
[skybot-lavalink-plugin]: https://github.com/DuncteBot/skybot-lavalink-plugin
[youtube-source]: https://github.com/lavalink-devs/youtube-source
[jiosaavn]: https://github.com/appujet/jiosaavn-plugin

## 🔧 Requirements

Before starting with the installation, you need to have the following:

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) [Recommend LTS or higher](https://nodejs.org/)
- ![Lavalink](https://img.shields.io/badge/Lavalink-7289DA?style=for-the-badge&logo=discord&logoColor=white) [v4 or higher](https://github.com/lavalink-devs/lavalink)
- ![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white) [Redis](https://redis.io/)

## 🚀 Installation from source

1. Clone the Lavamusic repository:

```bash
git clone https://github.com/appujet/lavamusic.git
```

2. Change to the Lavamusic directory:

```bash
cd lavamusic
```

3. Install the required packages:

```bash
npm i
```

4. Copy the `.env.example` file to `.env` and fill in all required values

5. Copy the `example.<The data source you want to use>.schema.prisma` file to `schema.prisma` in `prisma` folder
Note: If you want to use sqlite, skip this step.
If you are using a different data source, don't forget to fill in the `DATABASE_URL` value in `.env`.

6. Generate the Prisma client:

```bash
npm run db:push
```

7. Run the migrations (Only if you want to migrate your database):

```bash
npm run db:migrate
```

8. Run the Bridge:

Note: Run only 1 bridge

```bash
npm rum startserver
```
   
8. Run the Client:

Note: You can also run `run.bat` to easily run the bot on Windows.
Note: You can run clients on the same server as Bridge.

```bash
npm start
```

9. Invite the bot to your server:

Generate an invite link for your bot and invite it to your server using the [Discord Developer Portal](https://discord.com/developers/applications) or [Permissions Calculator](https://discordapi.com/permissions.html).


> If you want to monitor the bot on the web visit my repository https://github.com/UnknowUser0/WebStatus
