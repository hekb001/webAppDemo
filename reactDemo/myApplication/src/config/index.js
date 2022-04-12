const isDev = process.env.NODE_ENV === 'development'
import test from './test'
import production from './production'
let config = isDev ? test : production
export default config
