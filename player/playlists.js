const axios = require('axios')
const config = require('config')
const dburl = config.get('FIREBASE')
const musicPlayer = require('../player/music')
const youtubeSearcher = require('../utils/youtubeSearcher')
const Playlist = require('../models/Playlist')

const create = async (message, title, access) => {
	try {
		let owner = null
		if (access === 'private') {
			owner = {
				id: message.author.id,
				name: message.author.username
			}
		}

		const playlist = new Playlist(
			title, owner
		)
		await axios.post(`${dburl}/music/playlists.json`, playlist)

		message.channel.send(
			`Пустой ${owner == null ? '' : 'приватный'} плейлист ${title} успешно создан`)
	} catch (err) {
		console.log(err)
	}
}

const add = async (message, playlistTitle, youtube) => {
	try {
		const { url, title } = await youtubeSearcher(youtube)
		const { playlistId, playlist } = await searchPlaylistIdByTitle(playlistTitle)

		if (!playlist) return message.channel.send('Плейлист не найден')

		if (!playlist.songs) {
			playlist.songs = []
		}
		const song = { url, title }
		playlist.songs.push(song)
		await Playlist.update(playlistId, playlist)

		message.channel.send((
			`${title} успешно добавлено в плейлист ${playlistTitle}`
		))
	} catch (err) {
		console.log(err)
	}
}

const list = async message => {
	try {
		const data = (await axios.get(`${dburl}/music/playlists.json`)).data
		message.channel.send('Список всех плейлистов')
		Object.values(data).forEach((playlist, index) => {
			message.channel.send(
				`${index + 1}) ` + playlist.title + ` ${playlist.owner ? `   [${playlist.owner.name}]` : ''}`)
		})
	} catch (err) {
		console.log(err)
	}
}

const play = async (message, playlistTitle) => {
	try {
		const { playlist } = await searchPlaylistIdByTitle(playlistTitle)

		if (!playlist) return message.channel.send('Плейлист не найден')

		playlist.songs.forEach((song, index) => {
			a(message, playlistTitle, index)
		})
	} catch (err) {
		console.log(err)
	}
}

const a = async (message, playlistTitle, number) => {
	try {
		const { playlist } = await searchPlaylistIdByTitle(playlistTitle)

		if (typeof number !== 'number' && number > playlist.songs.length) return
		if (!playlist) return message.channel.send('Плейлист не найден')

		const song = playlist.songs[number - 1]
		await musicPlayer.add(message, song.url)
	} catch (err) {
		console.log(err)
	}
}

const searchPlaylistIdByTitle = async title => {
	try {
		const data = (await axios.get(`${dburl}/music/playlists.json`)).data
		let keyIndex = 0
		const playlist = Object.values(data).find((playlist, index) => {
			keyIndex = index
			return playlist.title === title
		})
		const playlistId = Object.keys(data)[keyIndex]

		return { playlistId, playlist }
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
	create, add, list, a, play
}