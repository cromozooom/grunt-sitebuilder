# grunt-sitebuilder
A Sass/Jade/Coffeescript/Typescript/Compass/Bootstrap site builder for Grunt

On save, the task runner will look for changes, compile the file from various formats (Sass, Coffeescript, Jade), and export to the build folder.
Uses BrowserSync to generate a local server.

* Sass files go in `source/styles` and on save will run autoprefixer and minify.
* Coffeescript/Typescript files go in `source/scripts` and on save will run JSLint and minify on success.
* Jade files go in `source/templates`
* Assets (Images/fonts/svg/json) go in `source/content`

There is also a `source/components` folder for Angular/React/Meteor development of modules.

The `build` folder will be cleaned and all of the files recompiled upon launch of the task runner. This ensures the most up-to-date versions of all the files. The `.gitignore` file will prevent from being checked into source control.

## Vendor Files Included
The Grunt Sitebuilder also includes several popular scripts built-in:
* Bootstrap 3 (Sass version) is included in the styles folder. 
* Angular v1.4.6 is loaded from the Google CDN in the footer
* jQuery v2.1.4 is loaded from the Google CDN in the footer

## Global Requirements:
* Node (v5+ recommended)
* Grunt
* Compass
* Coffeescript or Typescript
* Ruby Sass

## Dev Setup
* `npm install`
* `grunt` (for normal watch/build)
* `grunt build` (for building/exporting only. Will not generate sourcemaps and CSS/JS will be minified.)

## To-Do
* Modify the watch task to only compile the file that changed (instead of everything with that extension)
* Better typescript support
