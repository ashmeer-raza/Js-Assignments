## JavaScript Concepts Used

### `createElement()`

Used to create new HTML elements dynamically.

```js
const card = document.createElement("div");
```

### `createTextNode()`

Used to create text content for elements.

```js
const text = document.createTextNode(title.value);
```

### `append()`

Used to add elements or text nodes into other elements.

```js
card.append(text);
taskContainer.append(card);
```

## What I Learned

- How to create HTML elements dynamically using `createElement()`
- How to create text nodes using `createTextNode()`
- How to insert elements into the DOM using `append()`
- How to build dynamic UI components with JavaScript
