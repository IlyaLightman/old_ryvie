module.exports = {
	name: 'vote',
	description: 'Создаёт голосование с двумя вариантами ответа',
	cooldown: 5,
	// $vote Заказывать пиццу?
	async execute(message, args) {
		let request = ''
		args.forEach(arg => request += `${arg} `)

		const msg = await message.channel.send(`${request}`)

		await msg.react('👍')
		await msg.react('👎')
	}
}