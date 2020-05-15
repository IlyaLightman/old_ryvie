import mainReducer from '../state/reducers/main'

module.exports = {
	name: 'ryvie',
	description: 'For development',
	cooldown: 10,
	execute(message, args, store) {
		message.channel.send(message.author.id)
		const admins = process.env.admins.split('-')

		if (!admins.includes(message.author.id)) return

		// $ryvie chat-filter enable
		const command = args[0]
		const action = args[1]

		mainReducer()

		switch (command) {
			case 'chat-filter':

				break
		}

		console.log(admins[0])
	}
}