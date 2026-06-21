## 🧠 Core Concepts Explained

This project was built specifically to demonstrate the following browser and JavaScript fundamentals.

### 1. Parsing

Parsing is the process where the browser reads raw HTML/CSS source code (just a stream of characters) and converts it into a structured format it can actually work with. The browser's HTML parser reads the markup top to bottom and starts building a tree of elements based on tags, attributes, and nesting.

### 2. Tokenization

Tokenization is the first phase _inside_ parsing. Before the browser can build a tree, it has to break the raw text into meaningful chunks called **tokens** — things like start tags (`<div>`), end tags (`</div>`), attribute names/values, and text content. Each token represents one small, recognizable piece of the markup. Once tokens are produced, the parser uses them to construct the actual tree structure (the DOM).

```
Raw HTML  →  Tokens  →  DOM Tree
"<div id="x">"  →  [StartTag: div, Attr: id="x"]  →  <div> node
```

### 3. DOM Tree

The **DOM (Document Object Model)** Tree is the in-memory, tree-shaped representation of the HTML document. Every HTML tag becomes a **node** in this tree, with parent-child relationships matching the nesting in the markup. This is the structure JavaScript actually interacts with — every `document.createElement()`, `appendChild()`, or `querySelector()` call in `script.js` is reading or modifying this tree.

```
<html>
 └── <body>
      ├── <header>
      └── <div id="task-list">
           ├── <div class="task-card">
           └── <div class="task-card">
```

### 4. CSSOM Tree

The **CSSOM (CSS Object Model)** is the equivalent tree, but for styles. The browser parses all CSS (external stylesheets, `<style>` tags, inline styles) and builds a tree of style rules and their computed relationships (specificity, inheritance, cascading). This is what allows the browser to know, for any given element, exactly which styles apply and with what priority — it's also what JavaScript's `classList.toggle()` and `style` API ultimately interact with under the hood.

### 5. Render Tree

The **Render Tree** is built by combining the **DOM Tree** and the **CSSOM Tree**. It contains only the nodes that will actually be visually rendered (e.g., elements with `display: none` are excluded) along with their final computed styles. The browser uses this tree to calculate layout (position and size of every element — the "Layout"/"Reflow" step) and then paint pixels to the screen.

```
DOM Tree  +  CSSOM Tree  →  Render Tree  →  Layout  →  Paint
```

### 6. Event Bubbling

Event Bubbling is the default way events travel through the DOM: starting at the exact element that was interacted with (e.g., a button click) and then **moving upward** through each ancestor, all the way to `document`.

```
Click on <button> (Child)
   ↓ bubbles up
<div class="parent">
   ↓ bubbles up
<div class="grandparent">
```

In this project, the **Event Propagation Demo** section logs this exact sequence to the console: `Child → Parent → Grandparent`.

### 7. Event Capturing

Event Capturing is the **opposite direction** — it's the phase that happens _before_ bubbling. The event starts at the outermost ancestor (`document`) and travels **downward** toward the actual target element. By default, browsers don't run listeners in the capturing phase unless you explicitly opt in using `{ capture: true }` in `addEventListener()`.

```
Grandparent (capturing starts)
   ↓ travels down
Parent
   ↓ travels down
Child (target reached)
```

In this project, listeners attached with `{ capture: true }` log: `Grandparent → Parent → Child`.

### 8. Event Delegation

Event Delegation is a _practical technique_ that takes advantage of bubbling. Instead of attaching a separate `click` listener to every single task card (which wastes memory and breaks for dynamically-added tasks), this project attaches **one single listener** to the shared parent container (`#task-list`).

When any task card — or any button inside it — is clicked, the event bubbles up to the container. The single listener then inspects `event.target` (using `.closest()` or class checks) to figure out exactly which task and which button (Edit / Complete / Delete) triggered the click, and responds accordingly.

```javascript
taskContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".task-card");
  if (!card) return;

  if (event.target.matches(".delete-btn")) {
    card.remove();
  } else if (event.target.matches(".complete-btn")) {
    card.toggleAttribute("data-completed");
  }
});
```

This means new tasks added later automatically work with delete/edit/complete — no need to re-attach listeners.
