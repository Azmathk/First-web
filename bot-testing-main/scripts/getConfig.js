require('dotenv').config()
global.session = process.env.SESSION || 'well',

module.exports.getConfig = () => {
    return {
        name: process.env.NAME || 'GetBenefits',
        prefix: process.env.PREFIX || '!',
        writesonicAPI: process.env.WRITE_SONIC || null,
        bgAPI: process.env.BG_API_KEY || null,
        mods: (process.env.MODS || '').split(',')
    }
}
