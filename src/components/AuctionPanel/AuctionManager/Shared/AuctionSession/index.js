function setSession(sessionId) {
  let sessionName;
  switch (sessionId) {
    case 91:
      sessionName = "Morning";
      break;
    case 92:
      sessionName = "Post-Lunch";
      break;
    default:
      sessionName = "Unknown";
      break;
  }
  return sessionName;
}

export default setSession;
