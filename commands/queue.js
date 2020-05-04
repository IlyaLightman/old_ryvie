const { showQueue } = require('../player/music')

module.exports = {
	name: 'queue',
	aliases: ['q'],
	description: 'Очередь заказанных песен',
	cooldown: 1,
	async execute(message) {
		await showQueue(message)
	}
}