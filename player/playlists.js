const axios = require('axios')
const config = require('config')
const dburl = config.get('FIREBASE')
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
	create, add
}