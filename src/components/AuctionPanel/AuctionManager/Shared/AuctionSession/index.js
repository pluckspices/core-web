function setSession(sessionId) {
  let session;
  if (sessionId === 91) {
    session = "Morning";
  } else {
    session = "Post-Lunch";
  }
  return session;
};

export default setSession;