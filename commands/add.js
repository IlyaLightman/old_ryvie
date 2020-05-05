const { add } = require('../player/music')
const { validateURL } = require('ytdl-core')
const config = require('config')
const youtube = require('simple-youtube-api')

const YouTube = new youtube(config.get('YOUTUBE_TOKEN'))

module.exports = {
	name: 'add',
	aliases: ['a'],
	description: 'Добавляет песню в очередь прослушивания',
	cooldown: 1,
	async execute(message, args) {
		let url = ''
		if (!urlChecker(args[0])) {
			let request = ''
			args.forEach(arg => request += `${arg} `)

			await YouTube.searchVideos(request, 1)
				.then(results => {
					url = results[0].url
				})
		} else url = args[0]

		await add(message, url)
	}
}

const urlChecker = url => {
	return validateURL(url)
}