## ResponsiveDOM v0.1.0

##### ResponsiveDOM is still in development and is not ready for production use.

> _ResponsiveDOM_ is a JavaScript library that allows you to create responsive web pages using JavaScript. It is a lightweight library that is easy to use and easy to learn. ResponsiveDOM is a great alternative to CSS media queries and is a great way to make your web pages responsive.

## ResponsiveDOM Library Documentation

ResponsiveDOM is a JavaScript library designed to create responsive DOM components that adapt to different device sizes. It allows you to define and manage responsive behavior for web elements on your website. This documentation provides a comprehensive guide on how to use ResponsiveDOM.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Adding Media Query Listeners](#adding-media-query-listeners)
   - [Removing Media Query Listeners](#removing-media-query-listeners)
   - [Checking Device Types](#checking-device-types)
   - [Creating Responsive DOM Components](#creating-responsive-dom-components)
4. [API Reference](#api-reference)

## Introduction

Responsive web design is essential to ensure that your web content looks and behaves well on various devices, such as mobile phones, tablets, desktops, and even TVs. ResponsiveDOM simplifies this process by providing utilities to handle media queries and create responsive components.

## Installation

<details>
<summary>Import ResponsiveDOM via CDN</summary>
<br>
<code><script type="module" src="https://cdn.jsdelivr.net/gh/RizmyAbdulla/ResponsiveDOM@main/src/ResponsiveDOM.min.js"></script></code>
</details>

<details>
<summary>Import ResponsiveDOM via Locally (to js file)</summary>
<br>
<code>import ResponsiveDOM from "./src/ResponsiveDOM.min.js";</code>
</details>

<details>
<summary>Import ResponsiveDOM via Locally (to HTML file)</summary>
<br>
<code><script type="module" src="./src/ResponsiveDOM.min.js"></script></code>
</details>

## Usage

### Adding Media Query Listeners

To execute functions when media queries match, use the `onMediaQueryChange` method. This method allows you to define an array of media query strings and corresponding callback functions.

```javascript
ResponsiveDOM.onMediaQueryChange(
  ["(max-width: 767px)", "(min-width: 768px) and (max-width: 1023px)"],
  [callbackFunctionForMobile, callbackFunctionForTablet]
);
```

### Removing Media Query Listeners

To remove all media query listeners added with `onMediaQueryChange`, use the `removeMediaQueryListeners` method.

```
ResponsiveDOM.removeMediaQueryListeners();
```

### Checking Device Types

You can determine the current device type using the following methods:

- `isMobile()`: Checks if the device is a mobile device.
- `isTablet()`: Checks if the device is a tablet.
- `isDesktop()`: Checks if the device is a desktop.
- `isTV()`: Checks if the device has a TV screen size.

### Creating Responsive DOM Components

To create a responsive DOM component, use the `createComponent` method. You provide a CSS selector for the HTML element to be used as the component and define options for breakpoints, initialization, and destruction.

```
const myComponent = ResponsiveDOM.createComponent("#myElement", {
  breakpoints: {
    mobile: myMobileFunction,
    tablet: myTabletFunction,
    desktop: myDesktopFunction,
  },
  onInit: myInitFunction,
  onDestroy: myDestroyFunction,
  onResize: myResizeFunction,
});
```


## API Reference

### ResponsiveDOM Namespace

- `onMediaQueryChange(queries, funcs)`: Adds listeners to media queries and executes corresponding functions when the media query matches.
- `removeMediaQueryListeners()`: Removes all media query listeners that were added using `onMediaQueryChange`.
- `isMobile()`: Checks if the current device is a mobile device.
- `isTablet()`: Checks if the current device is a tablet.
- `isDesktop()`: Checks if the current device is a desktop.
- `isTV()`: Checks if the current device has a TV screen size.
- `createComponent(elementSelector, options)`: Creates a responsive DOM component with the given element selector and options.
- `determineBreakpoint(component)`: Determines the current breakpoint based on the window width and the component's breakpoints.

### Component Object

- `element`: The HTML element selected for the component.
- `options`: An object containing breakpoint functions and callbacks.
- `currentBreakpoint`: The current breakpoint of the component.
- `init()`: Initializes the component.
- `destroy()`: Destroys the component.

## Example

Here's an example of how to use ResponsiveDOM to create a responsive component:

```
import ResponsiveDOM from 'responsive-dom-library';

const myComponent = ResponsiveDOM.createComponent("#myElement", {
  breakpoints: {
    mobile: myMobileFunction,
    tablet: myTabletFunction,
    desktop: myDesktopFunction,
  },
  onInit: myInitFunction,
  onDestroy: myDestroyFunction,
  onResize: myResizeFunction,
});
```

For more examples and detailed usage, please refer to the library's documentation and code comments.

This documentation provides an overview of the ResponsiveDOM library. For specific implementation details and customization, consult the library's documentation and codebase.

This documentation provides a thorough guide on using the ResponsiveDOM library for creating responsive DOM components that adapt to different device sizes. You can use this documentation as a reference to understand how to utilize the library's features effectively.

## <span id="dev-note">Developer Note</span>

#### If you find this project useful or interesting, please consider giving it a star on GitHub by clicking the Star button at the top. Your support is greatly appreciated! &#10084;

#### Contributions are welcome! If you find any bugs or want to improve the project, please open an issue or submit a pull request. Make sure to follow the contribution guidelines mentioned in the repository.
