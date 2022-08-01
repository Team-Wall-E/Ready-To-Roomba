import { createMemoryHistory, createBrowserHistory } from 'history';

const history =
  process.env.NODE_ENV === 'test'
    ? createMemoryHistory() // eplicitly defined
    : createBrowserHistory(); // array & index controlled by browser and connot be directly accessed

console.log(history);
export default history;