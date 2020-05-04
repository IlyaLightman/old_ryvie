const { add } = require('../player/music')

module.exports = {
	name: 'add',
	aliases: ['a'],
	description: 'Добавляет песню в очередь прослушивания',
	cooldown: 1,
	async execute(message, args) {
		await add(message, args[0])
	}
}