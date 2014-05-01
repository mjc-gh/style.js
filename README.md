# style.js

Light-Weight Javascript Style Wrapper

## Installation

Using Bower:

    bower install style.js

Or grab the [source](https://github.com/mikeycgto/style.js/dist/style.js) ([minified](https://github.com/mikeycgto/style.js/dist/style.min.js)).

## Usage

Basic usage is as follows:

    // Read a style
    style(myHTMLElement)('font-size');

    // Write a style
    style(myHTMLElement)('font-size', '12px');

    // Can write without pixel units
    style(myHTMLElement)('font-size', 14);

    // Can read without units too (returns a number)
    style(myHTMLElement).unitless('font-size');
    style(myHTMLElement).u('font-size'); // alias

Note that, the wrapper function will cache the computed styles. It will
remove the cache when something is written. Do not write elsewhere or
else the cache will be stale!

## Contributing

We'll check out your contribution if you:

* Provide a comprehensive suite of tests for your fork.
* Have a clear and documented rationale for your changes.
* Package these up in a pull request.

We'll do our best to help you out with any contribution issues you may have.

## License

MIT. See `LICENSE.txt` in this directory.
