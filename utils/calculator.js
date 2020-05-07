const calc = message => {
	try {
		const expression = message.content.slice(1)

		const reply = eval(expression)

		message.channel.send(reply)
	} catch (err) {
		message.channel.send('Неверное выражение')
	}
}

module.exports = calc