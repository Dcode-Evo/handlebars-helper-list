# Handlebars helper {{list}}

Creates a table with bullets **ul** like

- __@param: bullet__: _{String}_ provides the bullet symbol (Default: •) or _provide image path to use image as bullet_
- __@param: bulletAlt__: _{String}_ provides the alt attribute value if image is used as bullet
- __@param: class__: _{String}_ add a specific class to the built table (optional)
- __@param: type__: _{String}_ set type of the list ul/ol (Default: ul)._Type ol will put numbers for each item_

__@usage__

```handlebars
{{#list class="my-classy-list" bullet=">"}}
- item 1 <strong>html is OK</strong>
- item 2 <img src="path-to/the-image.png">
{{/list}}
{{#list class="my-classy-list" bullet="my-bullet-image.png" bulletAlt="-" type="ol"}}
- item 1 <strong>html is OK</strong>
- item 2 <img src="path-to/the-image.png">
{{/list}}
```
Each line starting with '-' will be transformed into the list item

__NOTE__ no spaces allowed before the item starting `-`