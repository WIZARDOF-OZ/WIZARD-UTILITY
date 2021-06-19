module.exports = {
    token: process.env.TOKEN,
    mongoDB: process.env.MONGO_DB,
    prefix: "-",
    version: "2.0.4",
    lastUpdated: "2021-05-06T17:31:38.390Z",
    commandDir: "./Src/Commands",
    featuresDir: "./Src/Features",
    owners: ['583666642010112000'],
    dev: {
        enabled: false,
        guild: '810199045036441681',
        debug: false
    },
    color: {
        error: '#E72E2B',
        success: '#43B581',
        info: '#7289DA'
    },
    emoji: {
        error: '<:crooss:846305904567517184>',
        success: '<:tick:846306021663703070>',
        loading: '<a:a_Loading_Pixels:835623379591364608>'
    },
    
    api: {
        news: process.env.NEWS
    }
}