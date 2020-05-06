const axios = require('axios')
const config = require('config')
const firebaseUrl = config.get('FIREBASE')
const playlistUrl = `${firebaseUrl}/music/playlists.json`

class Playlist {
	constructor(title, owner = null) {
		this.title = title
		this.songs = []
		this.owner = owner
	}

	async upload() {
		try {
			const playlist = this
			await axios.post(playlistUrl, playlist)
		} catch (err) {
			console.log(err)
		}
	}

	async addSong(url) {
		try {
			const playlist = this
			playlist.songs.push(url)

		} catch (err) {
			console.log(err)
		}
	}

	async update() {
		try {
			const playlist = this
			await axios.put(playlistUrl, playlist)
		} catch (err) {
			console.log(err)
		}
	}
}

module.exports = Playlist