const getDateForAPI: () => string = () => {
  const date: Date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
};

const getDateNowISOString: () => string = () => {
  const date: Date = new Date();
  return date.toISOString();
};

const getSecondsBeforeMignight: () => number = () => {
  const midnight: number = new Date().setHours(23, 59, 59);
  const TTL: number = Math.round(midnight / 1000);
  return TTL;
};

const UtilsDates = {
  getDateForAPI,
  getDateNowISOString,
  getSecondsBeforeMignight,
};

export default UtilsDates;
