const axios = require('axios')
// const dburl = config.get('FIREBASE')
const dburl = process.env.FIREBASE
const musicPlayer = require('../player/music')
const youtubeSearcher = require('../utils/youtubeSearcher')
const Playlist = require('../models/Playlist')

const create = async (message, access, title) => {
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
			`Пустой ${owner == null ? '' : '*приватный*'} плейлист **${title}** успешно создан`)
	} catch (err) {
		console.log(err)
	}
}

const add = async (message, playlistTitle, youtube) => {
	try {
		const { url, title } = await youtubeSearcher(youtube)
		const { playlistId, playlist } = await searchPlaylistIdByTitle(playlistTitle)

		if (!playlist) return message.channel.send('*Плейлист не найден*')
		if (!isOwnerOfPlaylist(message, playlist)) return message.channel.send(
			'*Вы не владелец плейлиста*')

		if (!playlist.songs) {
			playlist.songs = []
		}
		const song = { url, title }
		playlist.songs.push(song)
		await Playlist.update(playlistId, playlist)

		message.channel.send((
			`**${title}** *успешно добавлено в плейлист* **${playlistTitle}**`
		))
	} catch (err) {
		console.log(err)
	}
}

const list = async message => {
	try {
		const data = (await axios.get(`${dburl}/music/playlists.json`)).data
		message.channel.send('***Список всех плейлистов:***')
		Object.values(data).forEach((playlist, index) => {
			message.channel.send(
				`**${index + 1})** ` + playlist.title + ` ${playlist.owner ? `   [*${playlist.owner.name}*]` : ''}`)
		})
	} catch (err) {
		console.log(err)
	}
}

const play = async (message, playlistTitle) => {
	try {
		const { playlist } = await searchPlaylistIdByTitle(playlistTitle)

		if (!playlist) return message.channel.send('*Плейлист не найден*')

		async function addSongs(songs) {
			for (const song of songs) {
				await musicPlayer.add(message, song.url)
			}
		}

		await addSongs(playlist.songs)
	} catch (err) {
		console.log(err)
	}
}

const a = async (message, playlistTitle, number) => {
	try {
		const { playlist } = await searchPlaylistIdByTitle(playlistTitle)

		if (typeof number !== 'number' && number > playlist.songs.length) return
		if (!playlist) return message.channel.send('*Плейлист не найден*')

		const song = playlist.songs[number - 1]
		await musicPlayer.add(message, song.url)
	} catch (err) {
		console.log(err)
	}
}

const show = async (message, playlistTitle) => {
	try {
		const { playlist } = await searchPlaylistIdByTitle(playlistTitle)
		if (!playlist) return message.channel.send('*Плейлист не найден*')
		if (playlist.songs.length === 0) return message.channel.send('*Плейлист пуст*')

		message.channel.send(`Плейлист **${playlistTitle}**: `)
		playlist.songs.forEach((song, index) => {
			message.channel.send(`**${index + 1})** ${song.title}`)
		})
	} catch (err) {
		console.log(err)
	}
}

const clear = async (message, playlistTitle) => {
	try {
		const { playlistId, playlist } = await searchPlaylistIdByTitle(playlistTitle)
		if (!playlist) return message.channel.send('*Плейлист не найден*')
		if (!isOwnerOfPlaylist(message, playlist)) return message.channel.send(
			'*Вы не владелец плейлиста*')

		playlist.songs = []
		await Playlist.update(playlistId, playlist)

		message.channel.send(`Плейлист **${playlistTitle}** полностью очищен`)
	} catch (err) {
		console.log(err)
	}
}

const pl_delete = async (message, playlistTitle) => {
	try {
		const { playlistId, playlist } = await searchPlaylistIdByTitle(playlistTitle)
		if (!playlistId) return message.channel.send('*Плейлист не найден*')
		if (!isOwnerOfPlaylist(message, playlist)) return message.channel.send(
			'*Вы не владелец плейлиста*')

		await axios.delete(`${dburl}/music/playlists/${playlistId}.json`)

		message.channel.send(`Плейлист **${playlistTitle}** удалён`)
	} catch (err) {
		console.log(err)
	}
}

const del = async (message, playlistTitle, number) => {
	try {
		const { playlistId, playlist } = await searchPlaylistIdByTitle(playlistTitle)
		if (!playlist) return message.channel.send('*Плейлист не найден*')
		if (!isOwnerOfPlaylist(message, playlist)) return message.channel.send(
			'*Вы не владелец плейлиста*')

		playlist.songs.splice(number - 1, 1)
		await Playlist.update(playlistId, playlist)

		message.channel.send(`Плейлист **${playlistTitle}** обновлён`)
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

const isOwnerOfPlaylist = (message, playlist) => {
	if (!playlist.owner) return true

	const id = message.author.id
	return id === playlist.owner.id
}

module.exports = {
	create, add, list, a, play, show, clear, pl_delete, del
}