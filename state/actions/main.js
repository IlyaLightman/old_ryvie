const {
	CHATFILTER_ENABLE,
	CHATFILTER_DISABLE
} = require('../actions/actionTypes')

const enableChatfilter = () => {
	return {
		type: CHATFILTER_ENABLE
	}
}

const disableChatfilter = () => {
	return {
		type: CHATFILTER_DISABLE
	}
}

module.exports = {
	enableChatfilter, disableChatfilter
}