import { API_URL, KEY } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async id => {
  try {
    const res = await Promise.race([fetch(`${API_URL}/${id}`), timeout(10)]);

    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};
