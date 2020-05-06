const axios = require('axios')
const config = require('config')
const url = config.get('FIREBASE')

const create = async (message, title) => {
	try {
		const playlist = {
			title,
			songs: []
		}
		await axios.post(`${url}/music/playlists.json`, playlist)
		message.channel.send(`Пустой плейлист ${title} успешно создан`)
	} catch (err) {
		console.log(err)
	}

}

module.exports = {
	create
}