module.exports = async () => {
  process.env.TZ = 'UTC';
  process.env.DISABLE_NEW_JSX_TRANSFORM = true;
};