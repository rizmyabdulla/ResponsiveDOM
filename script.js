import ResponsiveDOM from "./src/ResponsiveDOM.js";

const DestroyBtn = document.getElementById("destroy");
const InitBtn = document.getElementById("init");

// ResponsiveDOM.onMediaQueryChange(
//   ["(max-width: 768px)", "(min-width: 769px)"],
//   [
//     () => {
//       console.log("Width is less than or equal to 768px");
//     },
//     () => {
//       console.log("Width is greater than or equal to 769px");
//     },
//   ]
// );

// if (ResponsiveDOM.isMobile()) {
//   console.log("Its Mobile");
// } else if (ResponsiveDOM.isTablet()) {
//   console.log("Its Tablet");
// } else if (ResponsiveDOM.isDesktop()) {
//   console.log("Its Desktop");
// } else if (ResponsiveDOM.isTV()) {
//   console.log("Its TV");
// }

const card = ResponsiveDOM.createComponent(".card", {
  breakpoints: {
    mobile: (component) => {
      component.element.style.backgroundColor = "red";
      console.log("Mobile view");
    },
    tablet: (component) => {
      component.element.style.backgroundColor = "green";
      console.log("Tablet view");
    },
    desktop: (component) => {
      component.element.style.backgroundColor = "blue";
      console.log("Desktop view");
    },
  },
  onResize: (component) => {
    console.log("Resized");
  },
  onInit: (component) => {
    console.log("Initialized");
  },
  onDestroy: (component) => {
    console.log("Destroyed");
  },
});

DestroyBtn.addEventListener("click", () => {
  card.destroy();
});
InitBtn.addEventListener("click", () => {
  card.init();
});
