const { createLogger } = require('redux-logger');
let reduxLogger = function(){}

export default store => next => action => {
  if (process.env.NODE_ENV != 'production') {
	logger = createLogger({
		diff: true
	});
	return reduxLogger
	}else{
		return next(action)
	}
  
}