# grunt-sitebuilder
A Sass/Jade/Coffeescript/Compass/Bootstrap site builder for Grunt

On save, the task runner will look for changes, compile the file from various formats (Sass, Coffee, Jade), and export to the build folder.
Bootstrap (Sass version) is included in the styles folder.

* Sass files go in `source/styles`
* Coffeescript files go in `source/scripts`
* Jade files go in `source/templates`
* Assets (Images/fonts/svg/json) go in `source/content`

There is also a `source/components` folder for Angular/React/Meteor development of modules.

The `build` folder will be cleaned and all of the files recompiled upon launch of the task runner. This ensures the most up-to-date versions of all the files. The `.gitignore` file will prevent from being checked into source control.

## Global Requirements:
* Node (5+ recommended)
* Grunt
* Compass

## Dev Setup
* ```bundle install``` (for compass)
* ```npm install```
* ```grunt``` (for normal watch/build)
* ```grunt build``` (for building/exporting only)

## To-Do
* Modify the watch task to only compile the file that changed (instead of everything with that extension)
* Copy vendor scripts to 'build' folder