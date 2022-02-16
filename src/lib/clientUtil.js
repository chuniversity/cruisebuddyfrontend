import axios from "axios";
const zip = (...[first, ...arrays]) =>
  first.map((value, i) =>
    arrays.reduce((acc, array) => [...acc, array[i]], [value])
  );
const BASEURL = "https://pacific-fjord-25617.herokuapp.com/", //&& "http://zip.thruhere.net:3001",
  endpoints = [
    "/authenticate",
    "/comments",
    "/cruise_lines",
    "/helpfuls",
    "/itineraries",
    "/port_images",
    "/ports",
    "/regions",
    "/reviews",
    "/ship_images",
    "/ships",
    "/user_profiles",
    "/voyage_ports",
    "/voyages"
  ]
    .map(path => `${BASEURL}${path}`)
    .sort(),
  // Must define an ENDPOINTS object.
  // Must have a minimum of "authenticate" path
  ENDPOINTS = endpoints.reduce((acc, key) => {
    var tokens = key.split("/"),
      last = tokens.length - 1;
    acc[tokens[last]] = key;
    return acc;
  }, {});

console.table(ENDPOINTS);

var intervalIDs = {},
  STATE = { token: null, data: {} },
  LINE = Array.from({ length: 10 }, () => "*").join("");

var wait = ms =>
  new Promise((resolve, reject) => {
    return setTimeout(resolve, ms);
  });

var repeat = (ms, key, func) =>
  new Promise((resolve, reject) => {
    intervalIDs[key] = intervalIDs[key] == null ? [] : intervalIDs[key];
    intervalIDs[key].push(setInterval(func, ms));
    if (!STATE.data[key] || !STATE.token) wait(ms).then(resolve); // only wait if no data retrieved
  });

function clearIntervals(intervals) {
  if (intervals != null) {
    while (intervals.length) {
      clearInterval(intervals.pop());
    }
  }
}

var setToken = (key, url, credentials, component) =>
  new Promise((resolve, reject) => {
    axios
      .post(ENDPOINTS.authenticate, credentials)
      .then(res => {
        const isNullToken = STATE.token == null;
        STATE.token = isNullToken ? res.data.auth_token : STATE.token;
        if (STATE.token) clearIntervals(intervalIDs["authenticate"]);
        return STATE.token;
      })
      .then(token => {
        sessionStorage.setItem("AUTH_TOKEN", token);
        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          })
          .then(res => {
            const data = res.data;
            if (component != null) {
              console.log("SETTING STATE");
              console.table({ [key]: component.data });
              component.setState({ [key]: data[key] });
            }
            STATE.data[key] = data;
            [
              JSON.stringify(STATE.data, null, 2),
              LINE,
              `clearing intervals: ${key}`
            ].forEach(item => console.log(item));
            clearIntervals(intervalIDs[key]);
          })
          .catch(err => {
            console.error({ [url]: err.message });
            const status = err.response ? err.response.status : null;
            if (status === 401) STATE.token = null; // reset token so a new
            //one will be requested on the next iteration
          });
      })
      .catch(err => console.log({ axios_error: err.message }));
  });

var stopAfterNSecs = (n, key) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      for (key in intervalIDs) {
        clearIntervals(intervalIDs[key]);
      }
      console.log("repeat end");
    }, n);
  });

var WAITTIME = 1000, //1000 ms is 1 second
  MAXTIME = WAITTIME * 10, // 10 second timeout
  CREDENTIALS = { email: "example@mail.com", password: "123123123" };

function setDataFrom(key, url, component, credentials = CREDENTIALS) {
  repeat(WAITTIME, key, () =>
    Promise.all([setToken(key, url, credentials, component)]).catch(e =>
      console.error({ all_error: e.message })
    )
  )
    .then(stopAfterNSecs(MAXTIME, key)) // starts timer to end repetitions
    .catch(e => console.error({ foo: e.message }));
}

export { setDataFrom, ENDPOINTS, zip };
