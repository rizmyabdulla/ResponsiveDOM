const ResponsiveDOM = {
  mediaQueryListeners: [],

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
};

export default ResponsiveDOM;
