const app = require('./app')

app.listen(config.PORT, () => {
  logger.info(`Server running at http://localhost:${config.PORT}`);
});
