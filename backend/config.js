module.exports = {
  db: {
    url: 'mongodb://localhost/calendarapi',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  },
  facebookAppId: process.env.FACEBOOK_APP_ID,
  appSecretKey: process.env.APP_SECRET_KEY,
}