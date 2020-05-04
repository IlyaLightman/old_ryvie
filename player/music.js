const ytdl = require('ytdl-core')

const queue = new Map()
let serverQueue = null

const setPlayer = message => {
	serverQueue = queue.get(message.guild.id)
}

const add = async (message, youtube) => {
	const voiceChannel = message.member.voice.channel

	const songInfo = await ytdl.getInfo(youtube)
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
		length: songInfo.length_seconds
	}

	if (!serverQueue) {
		const queueContract = {
			textChannel: message.channel,
			voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		}

		queue.set(message.guild.id, queueContract)
		queueContract.songs.push(song)

		try {
			queueContract.connection = await voiceChannel.join()
			play(message.guild, queueContract.songs[0])
		} catch (err) {
			console.log(err)
			queue.delete(message.guild.id)
			return message.channel.send('Произошла ошибка (player/music/add)')
		}
	} else {
		serverQueue.songs.push(song)
		console.log(serverQueue.songs)
		return message.channel.send(`${song.title} добавлено в очередь!`)
	}
}

const play = (guild, song) => {
	const serverQueue = queue.get(guild.id)

	if (!song) {
		serverQueue.voice.channel.leave()
		queue.delete(guild.id)
		return
	}

	const dispatcher = serverQueue.connection.play(ytdl(song.url), {
		quality: 'highestaudio'
	})
		.on('end', () => {
			console.log('The end.')
			serverQueue.songs.shift()
			play(guild, serverQueue.songs[0])
		})
		.on('error', () => {
			console.error()
		})
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
}

module.exports = {
	setPlayer, add
}