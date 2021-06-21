export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  // isCoach(state, getters, rootstate, rootGetters) {
  isCoach(_, getters, _2, rootGetters) {
    // saying to linters i have to take theese args but don't want to use them
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    // this will return true if that's more than a minute ago. Divided by 1000 because those are in ms
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  }
};
