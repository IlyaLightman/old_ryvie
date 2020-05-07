const { create, add, list, a, play, show, clear, pl_delete, del } = require('../player/playlists')

// $pl <create/add/play/delete/clear> <private/public/empty> <title> <song/empty>

// $pl create private NewPlaylist1
// $pl list
// $pl add NewPlaylist1 TheBestSongInTheWorld

const validateCommands = ['create', 'add', 'play', 'list', 'delete', 'clear', 'a', 'show', 'del']

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
				// $pl create <private/public> <title>
				if (!(args[1] === 'private' || args[1] === 'public')) return sendError(message)
				await create(message, args[2], args[1])
				break
			case 'add':
				// $pl add <title> <url/youtube title>
				const request = args.filter((arg, index) => index > 1)
				await add(message, args[1], request)
				break
			case 'play':
				// $pl play <title>
				await play(message, args[1])
				break
			case 'a':
				// $pl a <title> <number>
				await a(message, args[1], args[2])
				break
			case 'list':
				// $pl list
				await list(message)
				break
			case 'show':
				// $pl show <title>
				await show(message, args[1])
				break
			case 'delete':
				// $pl delete <title>
				await pl_delete(message, args[1])
				break
			case 'clear':
				// $pl clear <title>
				await clear(message, args[1])
				break
			case 'del':
				// $pl del <title> <number>
				await del(message, args[1], args[2])
				break
			default: break
		}
	}
}

const sendError = message => {
	message.channel.send('Ошибка в аргументах команды')
}