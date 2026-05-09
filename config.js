module.exports = {
    token: process.env.TOKEN,
    mongoDB: process.env.MONGO_DB,
    prefix: "-",
    version: "2.0.4",
    lastUpdated: "2021-05-06T17:31:38.390Z",
    youtubeCookie: process.env.youtubeCookie,
    commandDir: "./Src/Commands",
    featuresDir: "./Src/Features",
    functionDir: "./Src/Features",
    owners: ['Owner1', 'Owner2'],
    supportsrv:`Your support server link`,
    AME_API:"Anime_API_Key",
    //<a:redbadge:837717474107326477> <a:Hypesquad:837258853627461632> <a:typing:862581397385248790>
    
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
