const Discord = require('discord.js')
require('dotenv').config()
const fs = require('fs')
const calc = require('./utils/calculator')
const mainReducer = require('./state/reducers/main')
const createStore = require('./state/store')

const token = process.env.DISCORD_TOKEN
const prefix = process.env.prefix
const hearts = ["\uD83D\uDC9A", "\uD83D\uDC9B", "\uD83D\uDC99", "\uD83D\uDC9C", "❤", "\uD83E\uDDE1"]

const client = new Discord.Client()
client.commands = new Discord.Collection()

const store = createStore(mainReducer)
store.subscribe(() => {
	console.log(store.getState())
})

const commandFiles = fs.readdirSync('./commands').filter(file => {
	return file.endsWith('.js')
})

commandFiles.forEach(file => {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
})

let commands = ''
client.commands.forEach(command => commands += `${command.name} `)
console.log(commands)

const cooldowns = new Discord.Collection()

client.once('ready', () => {
	console.log('Ryvie is ready!')
})

client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error);
})

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
})

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return

	const toCalc = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '+']
	if (toCalc.includes(message.content[1])) return calc(message)

	const heart = Math.floor(Math.random() * 6)
	message.react(hearts[heart]).then(() => {})

	const args = message.content.slice(prefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

	if (!command) return

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply(`Can't execute that command inside DMs!`)
	}

	if (command.args && !args.length) {
		let reply = `Это так не работает`

		if (command.usage) {
			reply += `\nВызов должен быть таким: \`${prefix}${command.name} ${command.usage}\``
			if (command.examples) {
				reply += `\nНапример: \`${prefix}${command.name} ${command.examples[0]}\``
				command.examples.shift()
				command.examples.forEach(example => {
					reply += ` или \`${prefix}${command.name} ${example}\``
				})
			}
		}

		return message.channel.send(reply)
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection())
	}

	const now = Date.now()
	const timestamps = cooldowns.get(command.name)
	const cooldownAmount = (command.cooldown || 3) * 1000

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000
			return message.reply(
				`Подожди ещё ${timeLeft.toFixed(1)} секунд перед использованием команды вновь`)
		}
	}

	timestamps.set(message.author.id, now)
	setTimeout(() => {
		timestamps.delete(message.author.id)
	}, cooldownAmount)

	try {
		command.execute(message, args, store)
	} catch (err) {
		console.error(err)
		message.reply(`Произошла ошибка`).then(console.log)
	}
})

// client.login(token).then(() => console.log(chalk.blue('Ryvie is here!')))
client.login(token).then(() => console.log('Ryvie is here!'))