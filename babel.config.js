const presets = [
    [
      "@babel/env",
      {
        targets: {
              edge: "15",
              ie: "11",
              firefox: "50",
              chrome: "64",
              //chrome_mobile: "78",
              //yandex: "15",
              safari: "11.1",
        },
        useBuiltIns: "usage", 
        corejs: "3.4.1"
      }
    ],
  ];
  
  module.exports = { presets };