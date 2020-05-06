const { create } = require('../player/playlists')

// $pl <create/add/play/delete/clear> <private/public/empty> <title> <song/empty>

// $pl create private NewPlaylist1
// $pl list
// $pl add NewPlaylist1 TheBestSongInTheWorld

const validateCommands = ['create', 'add', 'play', 'list', 'delete', 'clear']

module.exports = {
	name: 'playlist',
	aliases: ['pl'],
	description: 'Работа с плейлистами',
	cooldown: 1,
	async execute(message, args) {
		if (!validateCommands.includes(args[0])) {
			message.channel.send('Такой команды не существует')
			return
		}

		switch (args[0]) {
			case 'create':
				await create(message, args[1])
				break
			case 'add':

				break
			case 'play':

				break
			case 'list':

				break
			case 'delete':

				break
			case 'clear':

				break
			default: break
		}
	}
}