const { enableChatfilter, disableChatfilter } = require('../state/actions/main')

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

		switch (command) {
			case 'chat-filter':
				if (action === 'enable') {
					store.dispatch(enableChatfilter())
				} else {
					store.dispatch(disableChatfilter())
				}
				break
			default: store.dispatch({ type: 'checker' })
		}

		console.log(admins[0])
	}
}