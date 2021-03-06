# Ryvie
A powerful Discord bot


## Commands

There are commands of the bot

#### Basic

* **$ping** - Sends you "Pong"
* **$help** <_command_> - Sends you a message about any command
* **$vote** <_seconds_> <_question_> - Creates a simple vote

#### Music

* **$add** <_youtube link / title_> - Add a music to the queue (or **$a**)
* **$queue** - Shows you the current queue (or **$q**)
* **$skip** - Skips the current song (or **$s**)
* **$clear** - Clears the queue (or **$c**)
* **$play** <_number_> - Plays the selected music (or **$p**)

##### Music Playlists

* **$pl** create <_private*/public_> <_title_> - Create an empty playlist
* **$pl** add <_playlist title_> <_youtube link / title_>  - Add a song to the playlist
* **$pl** play <_playlist title_> - Add all songs from the playlist in the queue
* **$pl** a <_playlist title_> <_number_> - Add selected song in the queue
* **$pl** delete <_playlist title_> - Delete the playlist
* **$pl** del <_playlist title_> <_number_> - Delete selected song from the playlist
* **$pl** clear <_playlist title_> - Delete all songs from the playlist
* **$pl** show <_playlist title_> - Shows you all songs and its numbers of the playlist
* **$pl** list - Shows you all playlists

All members are able to listen any playlists, include private,
but only owner of the private playlist can add new songs in it.

#### Fun

* **$roulette** <_chance (0 - 100%)_> - Bans you with the selected chance ($roulette 25)
* **$roll** <_interval (x-y) / dice (XdY)_> - Rolls dices ($dice 2d20)
* **$**<_math expression_> - Calculates a mathematical expression ($2+2)

#### System

* **$ryvie** <_chat-filter_> <_enable/disable_> - Chat filter of Ryvie

---

![Ryvie for Discord](https://i.ibb.co/DgHLfFx/bor-for-discord.png "Bot for Discord")
