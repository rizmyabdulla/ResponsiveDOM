import ResponsiveDOM from "./src/ResponsiveDOM.js";

ResponsiveDOM.onMediaQueryChange(
  ["(max-width: 768px)", "(min-width: 769px)"],
  [
    () => {
      console.log("Width is less than or equal to 768px");
    },
    () => {
      console.log("Width is greater than or equal to 769px");
    },
  ]
);
