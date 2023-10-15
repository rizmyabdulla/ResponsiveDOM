const ResponsiveDOM = {
  mediaQueryListeners: [],

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

  removeMediaQueryListeners() {
    this.mediaQueryListeners.forEach(({ mediaQueryList, callback }) => {
      mediaQueryList.removeListener(callback);
    });
    this.mediaQueryListeners = [];
  },
};

export default ResponsiveDOM;
