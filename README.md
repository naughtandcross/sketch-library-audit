# Sketch Library Audit
Export Symbol and Shared Style data from any Sketch Library to CSV. 

After running two separate design system audits in the span of 6 months, I swore to never manually type or copy and paste symbol data out of Sketch again. At the moment, this plugin will get you an alpha sorted CSV of all your symbols, layer, and text styles names, their current usage count within the library, and in the case of local libraries, a direct link back into Sketch, centered and framed on the desired symbol.

# Usage
Command + Option + L = Run Library Audit

# Installation
Runner and Sketch Packs once the directory updates.

# Changelog
* **v0.3.0** - Now skips over disabled libraries.
* **v0.2.0** - Looks like a new version of `skpm publish` fixed my issue with publishing.
* **v0.1.8** - After wrestling with `skpm publish` for a couple of nights, filed a PR manually to get this out.
* **v0.1.3** - Improved error handling for instances where users have an invalid library loaded.
* **v0.1.2** - Initial Preview Release

# Contact
I'm [@naughtandcross](https://twitter.com/naughtandcross) on twitter.

# License
MIT y'all.
