export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    };
    // fetch to send http request to firebase
    const response = await fetch(
      `https://findacaoch-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request');
      throw error;
    }

    console.log(responseData);
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  // only the requests that were sent to the active user - we need user Id from our global state / getters
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://findacaoch-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch request'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      //create request helper
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  }
};
