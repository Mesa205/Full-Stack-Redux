export const response = (reply, StatusCode, ok, data, message) => {
  reply.code(StatusCode).send({ ok, data, message });
};
