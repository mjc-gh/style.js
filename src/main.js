// From jQuery (src/css.js)
var cssNumber = {
    boxFlex: true, columnCount: true, fillOpacity: true,
    fontWeight: true, lineHeight: true, opacity: true,
    orphans: true, widows: true, zIndex: true, zoom: true
};

var cssUrl = {
    backgroundImage: true
};


function camelCase(prop){
    return prop.replace(/-[a-z]/g, function(match){
        return match[1].toUpperCase();
    });
}

function Style(el){
    var computed;

    function read(prop){
        if (computed == undefined)
            computed = root.getComputedStyle(el);

        var value = computed.getPropertyValue(prop);

        return value === '' || value === null ?
            undefined : value;
    }

    function write(prop, value){
        var cProp = camelCase(prop);

        computed = null; // clear computed cache

        if (value === undefined){
            el.style.removeProperty(prop)
            return;
        } else if (!cssNumber[cProp] && typeof value == 'number'){
            // pixelify value
            value += 'px';

        } else if (cssUrl[cProp] && /^http|^\/\//.test(value)){
            // wrap with url(...)
            value = 'url('+ value +')';

        } else if (Array.isArray(value)){
            // handles values like ['translate', 40, 50]
            value = value.shift() +'('+ value.map(function(arg){
                // pixelify numbers
                if (typeof arg == 'number')
                    arg += 'px';
                return arg;
            }).join(', ') +')';
        }

        el.style[cProp] = value;
    }

    function proxy(prop, rules){
        if (arguments.length == 1) {
            if (typeof prop == 'string')
                return read(prop);
            else for (var i in prop)
                write(i, prop[i]);
        } else {
            write(prop, rules);
        }
    };

    proxy.unitless = proxy.u = function(prop){
        return parseFloat(read(prop), 10) || 0;
    };

    return proxy;
}

Style.VERSION = '0.0.1';

root.Style = root.S = Style;
