const ResponsiveDOM = {
  mediaQueryListeners: [],
  components: [],

  /**
   * @param {string[]} queries
   * Media queries to match
   * @param {function[]} funcs
   * functions to be called when the media query matches
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
   * @Note Removes all media query listeners
   *
   */
  removeMediaQueryListeners() {
    this.mediaQueryListeners.forEach(({ mediaQueryList, callback }) => {
      mediaQueryList.removeListener(callback);
    });
    this.mediaQueryListeners = [];
  },

  /**
   * @note Returns true if the device is mobile
   * @query "(max-width: 767px)"
   */

  isMobile() {
    const mobileMediaQuery = window.matchMedia("(max-width: 767px)");
    return mobileMediaQuery.matches;
  },

  /**
   * @note Returns true if the device is Tablet
   * @query "(min-width: 768px) and (max-width: 1023px)"
   */

  isTablet() {
    const tabletMediaQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)"
    );
    return tabletMediaQuery.matches;
  },

  /**
   * @note Returns true if the device is Desktop
   * @query "(max-width: 1024px)"
   */

  isDesktop() {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");
    return desktopMediaQuery.matches;
  },

  /**
   * @note Returns true if the device is TV
   * @query "(min-width: 1366px)"
   */

  isTV() {
    const tvMediaQuery = window.matchMedia("(min-width: 1366px)");
    return tvMediaQuery.matches;
  },

  /**
   *
   * @param {string} elementSelector - selector for the element
   * @param {object} options - options for the component
   *
   * @returns {object} component
   *
   * @note Creates a new component
   */

  createComponent(elementSelector, options) {
    const Element = document.querySelector(elementSelector);
    if (!Element) {
      throw new Error(`Element with selector '${elementSelector}' not found.`);
    }

    const component = {
      element: Element,
      options: options || {
        darkmode: () => {
          Element.classList.add("rd-dark");
        },
        lightmode: () => {
          Element.classList.remove("rd-dark");
        },
      },
    };

    this.components.push(component);

    return component;
  },
};

export default ResponsiveDOM;
