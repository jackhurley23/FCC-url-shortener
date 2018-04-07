const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
  process.env.DB_HOST
}`;

const baseConfig = {
  db: {
    url
  },
  port: 3000,
  secrets: {}
};

export default baseConfig;
