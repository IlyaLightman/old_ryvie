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

	static async update (id, playlist) {
		try {
			const url = `${firebaseUrl}/music/playlists/${id}.json`
			await axios.put(url, playlist)
		} catch (err) {
			console.log(err)
		}
	}
}

module.exports = Playlist