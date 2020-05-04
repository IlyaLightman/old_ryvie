module.exports = {
	name: 'roll',
	description: 'Рандомндое значение (от-до/дайсы), только положительные числа',
	aliases: ['dice', 'rand', 'random'],
	usage: '[интервал] / [dices]',
	examples: ['5-25', '4d20'],
	cooldown: 2,
	args: true,
	execute(message, args) {
		const arg = args[0]
		let rand = 'Переданы неверные параметры'

		if (args[0].includes('d')) {
			let [ count, dice ] = arg.split('d')

			if (!((isNaN(+count) || isNaN(+dice))) && +count > 0 && +dice > 0) {
				count = +count
				dice = +dice

				rand = `${Math.floor(Math.random() * dice)}`
				let sum = +rand
				for (let i = 1; i < count; i++) {
					const value = Math.round(Math.random() * dice) + 1
					rand += ` + ${value}`
					sum += value
				}
				rand += ` = ${sum}`
			}
		} else if (args[0].includes('-')) {
			let [ from, to ] = arg.split('-')

			if (!((isNaN(+from) || isNaN(+to))) && +from > 0 && +to > 0) {
				from = +from
				to = +to

				rand = Math.floor(Math.random() * (to - from) + from)
			}
		}

		message.channel.send(rand).then()
	}
}