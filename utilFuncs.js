const https = require("https");
const fs = require("fs");

const linkChecker = input => {
  return new Promise((resolve, reject) => {
    let result = {};

    https
      .get(input, res => {
        let data = "";

        res.on("data", chunk => {
          data += chunk;
        });

        res.on("end", () => {
          if (res.statusCode === 200) {
            result[200] = input;
          } else if (res.statusCode === 404) {
            result[404] = input;
          }
          resolve(result);
        });
      })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  });
};

linkChecker("https://web-crawler-test1.herokuapp.com/").then(res =>
  console.log(res)
);

const urlScraper = input => {
  return new Promise((resolve, reject) => {
    let links = [];

    https
      .get(input, res => {
        let data = "";

        res.on("data", chunk => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  });
};

urlScraper("https://web-crawler-test1.herokuapp.com/").then(res =>
  console.log(JSON.parse(res))
);

// [<a href=/](\w+/\w+.html)
