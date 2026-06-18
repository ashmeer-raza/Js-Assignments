# Attributes vs Properties

## Overview

This project demonstrates how to work with HTML attributes and DOM properties in JavaScript. A task card is created using custom data attributes such as `data-id`, `data-status`, and `data-category`.

## Attribute Methods

The project uses `getAttribute()` to read attribute values, `setAttribute()` to update attributes, `removeAttribute()` to remove attributes, and `hasAttribute()` to check whether an attribute exists. It also uses `dataset` to access custom `data-*` attributes in a simpler way.

## Attributes vs Properties

The difference between attributes and properties is demonstrated using an input element. `getAttribute("value")` reads the original value from the HTML, while `input.value` returns the current value stored in the DOM. After updating the input value, the property changes but the attribute remains unchanged.
