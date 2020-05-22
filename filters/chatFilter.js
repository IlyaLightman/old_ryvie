const messageFilter = message => {
	const author = message.author.id

	if (message.content === 'уга вуга') return message.channel.send('нет не вуга')
}

module.exports = {
	messageFilter
}