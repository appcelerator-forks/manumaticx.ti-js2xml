# ti-js2xml #

## Overview ##

ti-js2xml is a fork of [node-js2xmlparser](https://github.com/michaelkourlas/node-js2xmlparser), a Node.js module for parsing JavaScript objects into XML. This fork adds Titanium modules for iOS and Android which can be used the same way as the original library.

## Features ##

Since XML is a data-interchange format, ti-js2xml is designed primarily for JSON-type objects, arrays and primitive
data types, like many of the other JavaScript to XML parsers currently available for Node.js.

However, ti-js2xml is capable of parsing any object, including native JavaScript objects such as Date and RegExp, by
taking advantage of each object's toString function. Functions are a special case where the return value of the function
itself is used instead of the toString function, if available.

ti-js2xml also supports a number of constructs unique to XML:

* attributes (through a unique attribute property in objects)
* mixed content (through a unique value property in objects)
* multiple elements with the same name (through arrays)

ti-js2xml can also pretty-print the XML it outputs with the option of customizing the indent string.

## Get it  [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/dk.napp.drawer) ##
Download the latest distribution ZIP-file and consult the [Titanium Documentation](http://docs.appcelerator.com/titanium/latest/#!/guide/Using_a_Module) on how install it, or simply use the [gitTio CLI](http://gitt.io/cli):

`$ gittio install ti.js2xml`

## Usage ##

The ti-js2xml module contains one function which takes the following arguments:

* `root` - the XML root element's name (string, mandatory)
* `data` - the data to be converted to XML; while the data object can contain arrays, it cannot itself be an array
  (object or JSON string, mandatory)
* `options` - module options (object, optional)
    * `declaration` - XML declaration options (object, optional)
        * `include` - specifies whether an XML declaration should be included (boolean, optional, default: true)
        * `encoding` - value of XML encoding attribute in declaration; a value of null represents no encoding attribute
          (string, optional, default: "UTF-8")
    * `attributeString` - the name of the property representing an element's attributes (string, optional, default: "@")
    * `valueString` - the name of the property representing an element's value (string, optional, default: "#")
    * `prettyPrinting` - pretty-printing options (object, optional)
        * `enabled` - specifies whether pretty-printing is enabled (boolean, optional, default: true)
        * `indentString` - indent string (string, optional, default: "\t")
    * `convertMap` - maps object types (as given by the `Object.prototype.toString.call` method) to functions to convert
      those objects to a particular string representation; `*` can be used as a wildcard for all types of objects
      (object, optional, default: {})
    * `useCDATA` - specifies whether strings should be enclosed in CDATA tags; otherwise, illegal XML characters will
      be escaped (boolean, optional, default: false)

## Examples ##

The following example illustrates the basic usage of ti-js2xml:

    var js2xml = require("ti.js2xml");

    var data = {
        "firstName": "John",
        "lastName": "Smith"
    };

    console.log(js2xml("person", data));

    > <?xml version="1.0" encoding="UTF-8"?>
    > <person>
    >     <firstName>John</firstName>
    >     <lastName>Smith</lastName>
    > </person>

Here's a more complex example that builds on the first:

    var js2xml = require("ti.js2xml");

    var data = {
        "@": {
          "type": "individual"
        },
        "firstName": "John",
        "lastName": "Smith",
        "dateOfBirth": new Date(1964, 07, 26),
        "address": {
            "@": {
                "type": "home"
            },
            "streetAddress": "3212 22nd St",
            "city": "Chicago",
            "state": "Illinois",
            "zip": 10000
        },
        "phone": [
            {
                "@": {
                    "type": "home"
                },
                "#": "123-555-4567"
            },
            {
                "@": {
                    "type": "cell"
                },
                "#": "456-555-7890"
            }
        ],
        "email": function() {return "john@smith.com";},
        "notes": "John's profile is not complete."
    };

    console.log(js2xml("person", data));

    > <?xml version="1.0" encoding="UTF-8"?>
    > <person type="individual">
    >     <firstName>John</firstName>
    >     <lastName>Smith</lastName>
    >     <dateOfBirth>Wed Aug 26 1964 00:00:00 GMT-0400 (Eastern Daylight Time)</dateOfBirth>
    >     <address type="home">
    >         <streetAddress>3212 22nd St</streetAddress>
    >         <city>Chicago</city>
    >         <state>Illinois</state>
    >         <zip>10000</zip>
    >     </address>
    >     <phone type="home">123-555-4567</phone>
    >     <phone type="cell">456-555-7890</phone>
    >     <email>john@smith.com</email>
    >     <notes>John&apos;s profile is not complete.</notes>
    > </person>

Here's an example that uses the convert map feature:

    var js2xml = require("ti.js2xml");

    var data = {
        "dateOfBirth": new Date(1964, 7, 26)
    };

    var options = {
        convertMap: {
            "[object Date]": function(date) {
                return date.toISOString();
            }
        }
    };

    console.log(js2xml("person", data, options));

    > <?xml version="1.0" encoding="UTF-8"?>
    > <person>
    >     <dateOfBirth>1964-08-26T04:00:00.000Z</dateOfBirth>
    > </person>

Here's an example that wraps strings in CDATA tags instead of escaping invalid characters.

    var js2xml = require("ti.js2xml");

    var data = {
        "notes": "John's profile is not complete."
    };

    var options = {
        useCDATA: true
    };

    console.log(js2xml("person", data, options));

    > <?xml version="1.0" encoding="UTF-8"?>
    > <person>
    >     <notes><![CDATA[John's profile is not complete.]]></notes>
    > </person>

## Tests ##

ti-js2xml comes with a set of tests that evaluate and verify the package's core functionality. To run the tests:

* Install the test dependencies with `npm install`.
* Run the tests with `mocha`.

## License ##

ti-js2xml is licensed under the [MIT license](http://opensource.org/licenses/MIT). Please see the LICENSE.md file
for more information.
