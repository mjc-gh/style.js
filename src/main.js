// From jQuery (src/css.js)
var cssNumber = {
    boxFlex: true, columnCount: true, fillOpacity: true,
    fontWeight: true, lineHeight: true, opacity: true,
    orphans: true, widows: true, zIndex: true, zoom: true
};

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
        if (cssNumber[prop])
            value += 'px'; // pixelify value

        el.style[prop] = value;
        computed = null; // clear computed cache
    }

    function proxy(prop, rules){
        if (rules == undefined) {
            if (typeof prop == 'string')
                return read(prop);
            else for (var i in prop)
                write(i, prop[i]);

        } else write(camelCase(prop), rules);
    };

    proxy.unitless = proxy.u = function(prop){
        return parseFloat(read(prop), 10) || 0;
    };

    return proxy;
}

Style.VERSION = '0.0.1';

root.Style = root.S = Style;
