const {
	CHATFILTER_ENABLE,
	CHATFILTER_DISABLE
} = require('../actions/actionTypes')

const initialState = {
	chatFilter: false
}

export default function mainReducer(state = initialState, action) {
	switch (action.type) {
		case CHATFILTER_ENABLE:
			return {
				...state, chatFilter: true
			}
		case CHATFILTER_DISABLE:
			return {
				...state, chatFilter: false
			}
		default: return state
	}
}