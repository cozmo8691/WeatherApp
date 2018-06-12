import 'whatwg-fetch';

export default {
  makeRequest(url) {
    return fetch(url).then(response => {
      if (response.ok) {
        return response;
      }
      throw new Error('Network response was not ok.');
    });
  }
};
