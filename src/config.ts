import { createBrowserHistory } from "history";

const isBuild: boolean = false;
export const browserHistory = createBrowserHistory();
export const serverUrl: string = `http://${window.location.hostname}${
  isBuild ? "" : ":8000"
}/gql`;

console.log(serverUrl);
