/**
 * A library for creating responsive DOM components that adapt to different device sizes.
 * @namespace ResponsiveDOM
 */
const ResponsiveDOM = {
  mediaQueryListeners: [],
  components: [],

  /**
   * Adds listeners to media queries and executes corresponding functions when the media query matches.
   * @param {Array<string>} queries - An array of media query strings.
   * @param {Array<Function>} funcs - An array of callback functions to execute when the corresponding media query matches.
   * @throws {Error} If queries or funcs are not arrays, or if an invalid query or callback function is provided.
   */
  onMediaQueryChange(queries, funcs) {
    if (!Array.isArray(queries) || !Array.isArray(funcs)) {
      throw new Error("Queries and funcs should be arrays.");
    }

    queries.forEach((query, index) => {
      const func = funcs[index];

      if (typeof query !== "string" || typeof func !== "function") {
        throw new Error("Invalid query or callback function.");
      }

      const mediaQueryList = window.matchMedia(query);
      const callback = (event) => {
        if (event.matches) {
          func();
        }
      };

      mediaQueryList.addListener(callback);

      this.mediaQueryListeners.push({
        mediaQueryList,
        callback,
      });
    });
  },

  /**
   * Removes all media query listeners that were added using the `addMediaQueryListener` method.
   * @memberof ResponsiveDOM
   * @method
   */
  removeMediaQueryListeners() {
    this.mediaQueryListeners.forEach(({ mediaQueryList, callback }) => {
      mediaQueryList.removeListener(callback);
    });
    this.mediaQueryListeners = [];
  },

  /**
   * Checks if the current device is a mobile device.
   * @returns {boolean} - Returns true if the device is a mobile device, false otherwise.
   */
  isMobile() {
    const mobileMediaQuery = window.matchMedia("(max-width: 767px)");
    return mobileMediaQuery.matches;
  },

  /**
   * Checks if the current device is a tablet.
   * @returns {boolean} - Returns true if the device is a tablet, false otherwise.
   */

  isTablet() {
    const tabletMediaQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)"
    );
    return tabletMediaQuery.matches;
  },

  /**
   * Checks if the current device is a desktop based on the window width.
   * @returns {boolean} Returns true if the device is a desktop, false otherwise.
   */
  isDesktop() {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");
    return desktopMediaQuery.matches;
  },

  /**
   * Checks if the current device has a TV screen size.
   * @returns {boolean} Returns true if the device has a TV screen size, otherwise false.
   */
  isTV() {
    const tvMediaQuery = window.matchMedia("(min-width: 1366px)");
    return tvMediaQuery.matches;
  },

  /**
   * Creates a responsive DOM component with the given element selector and options.
   *
   * @param {string} elementSelector - The CSS selector for the HTML element to use as the component.
   * @param {Object} options - The options for the component.
   * @param {Object} options.breakpoints - The breakpoints for the component, with keys for "mobile", "tablet", and "desktop".
   * @param {Function} options.onResize - The function to call when the component is resized.
   * @param {Function} options.onInit - The function to call when the component is initialized.
   * @param {Function} options.onDestroy - The function to call when the component is destroyed.
   * @returns {Object} The created component object.
   */
  createComponent(elementSelector, options) {
    const element = document.querySelector(elementSelector);

    if (!element) {
      console.error(`Element with selector '${elementSelector}' not found.`);
      return null;
    }

    const defaultOptions = {
      breakpoints: {
        mobile: null,
        tablet: null,
        desktop: null,
      },
      onResize: null,
      onInit: null,
      onDestroy: null,
    };

    const componentOptions = Object.assign({}, defaultOptions, options);

    const component = {
      element,
      options: componentOptions,
      currentBreakpoint: null,
    };

    /**
     * Handles the change in breakpoint for a component and performs actions based on the new breakpoint.
     */
    const handleBreakpointChange = () => {
      const newBreakpoint = ResponsiveDOM.determineBreakpoint(component);
      if (newBreakpoint !== component.currentBreakpoint) {
        component.currentBreakpoint = newBreakpoint;
        // Perform actions based on the new breakpoint
        if (component.options.breakpoints[newBreakpoint]) {
          component.options.breakpoints[newBreakpoint](component);
        }
      }
    };

    /**
     * Event listener for window resize events.
     *
     * @function
     * @name resizeListener
     * @memberof module:ResponsiveDOM
     * @inner
     * @param {Event} event - The resize event object.
     * @returns {void}
     */
    const resizeListener = () => {
      if (component.options.onResize) {
        component.options.onResize(component);
      }
      handleBreakpointChange();
    };

    /**
     * Initializes the ResponsiveDOM component by calling the onInit callback function (if provided),
     * determining the initial breakpoint, and adding a resize listener to the window.
     */
    const init = () => {
      if (component.options.onInit) {
        component.options.onInit(component);
      }
      handleBreakpointChange();
      window.addEventListener("resize", resizeListener);
    };

    /**
     * Destroys the component and removes the resize listener.
     * @function
     * @memberof ResponsiveDOM
     */
    const destroy = () => {
      if (component.options.onDestroy) {
        component.options.onDestroy(component);
      }
      window.removeEventListener("resize", resizeListener);
    };

    component.destroy = destroy;
    component.init = init;

    init();
    this.components.push(component);

    return component;
  },

  /**
   * Determines the current breakpoint based on the window width and the component's breakpoints.
   * @param {Object} component - The component to determine the breakpoint for.
   * @returns {string} The current breakpoint ("mobile", "tablet", or "desktop").
   */
  determineBreakpoint(component) {
    const breakpoints = component.options.breakpoints;

    let currentBreakpoint = "mobile";

    const windowWidth = window.innerWidth;

    if (windowWidth >= 768 && windowWidth < 1024) {
      currentBreakpoint = "tablet";
    } else if (windowWidth >= 1024) {
      currentBreakpoint = "desktop";
    } else if (windowWidth >= 1366) {
      currentBreakpoint = "tv";
    }

    return currentBreakpoint;
  },
};

export default ResponsiveDOM;
