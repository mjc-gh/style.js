!function(root, undefined) {


if (root.getComputedStyle == undefined)
    throw new Error('unsupport');

// From jQuery (src/css.js)
var cssNumber = {
    boxFlex: true, columnCount: true, fillOpacity: true,
    fontWeight: true, lineHeight: true, opacity: true,
    orphans: true, widows: true, zIndex: true, zoom: true
};

// Base function.
function Style(el){
    var computed;

    function camelCase(prop){
        return prop.replace(/-[a-z]/g, function(match){
            return match[1].toUpperCase();
        });
    }

    function read(prop){
        if (computed == undefined)
            computed = root.getComputedStyle(el);

        var value = computed.getPropertyValue(prop);

        return value === '' || value === null ?
            undefined : value;
    }

    function write(prop, value){
        if (typeof value == 'string' || typeof value == 'number'){
            if (cssNumber[prop])
                value += 'px'; // pixelify value

            el.style[prop] = value;
            computed = null; // clear computed cache

        } else for (var i in value)
            write(prop, value[i]);
    }

    function proxy(prop, rules){
        if (rules == undefined) return read(prop);
        else write(camelCase(prop), rules);
    };

    proxy.unitless = proxy.u = function(prop){
        return parseFloat(read(prop), 10) || undefined;
    };

    return proxy
}

// Version.
Style.VERSION = '0.0.1';

// Export to the root, which is probably `window`.
root.Style = root.S = Style;


}(this);
