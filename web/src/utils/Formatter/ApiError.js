export const extractMessages = (err) => {
  const { response } = err;
  if (!response) {
    const messages = [];
    messages.push(err.message);
    return messages;
  }
  const status = response.status;
  if (status === 400) {
    console.log("CALLED");
    const messages = response.data.message;
    const errors = messages.map((message) => {
      for (const property in message) {
        return `${message[property]}`;
      }
    });
    return errors;
  }
  if (status === 500 || status === 401) {
    const messages = [];
    messages.push(response.data.message);
    return messages;
  }
};
