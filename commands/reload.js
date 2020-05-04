module.exports = {
	name: 'reload',
	description: 'Перезагружает команду (для разработки)',
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase()
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

		if (!command) {
			return message.channel.send(`Нет команды с таким именем ага да`)
		}

		delete require.cache[require.resolve(`./${commandName}.js`)]

		try {
			const newCommand = require(`./${commandName}.js`)
			message.client.commands.set(newCommand.name, newCommand)
		} catch (err) {
			console.log(err)
			return message.channel.send(
				`Произошла ошибка во время перезагрузки команды \`${commandName}\`:\n\`${err.message}\``)
		}
		message.channel.send(`Комманда \`${commandName}\` была перезагружена`).then()
	}
}