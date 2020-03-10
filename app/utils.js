const createMessageObject = text => {
  return {
    text,
    createdAt: new Date().getTime()
  };
};

module.exports = { createMessageObject };
