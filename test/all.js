var el;

QUnit.testStart(function(){ document.body.appendChild(el = document.createElement('div')); });
QUnit.testDone(function(){ document.body.removeChild(el); });

test('Style exists', function() {
    ok(Style);
});

test('S exists', function(){
    ok(S);
});

test('S returns a function', function(){
    equal(typeof S(el), 'function');
});

test('read non-existant style', function(){
    strictEqual(S(el)('content'), undefined);
});

test('read existing style', function(){
    el.style.fontSize = '12px';

    equal(S(el)('font-size'), '12px');
});

test('read unitless style', function(){
    el.style.fontSize = '12px';

    strictEqual(S(el).unitless('font-size'), 12);
});

test('read unitless non-existant style', function(){
    strictEqual(S(el).unitless('margin'), 0);
});

test('write style', function(){
    S(el)('font-size', '100px');

    equal(el.style.fontSize, '100px');
});

test('write as number', function(){
    S(el)('font-size', 100);

    equal(el.style.fontSize, '100px');
});

test('write object of styles', function(){
    S(el)({ 'font-size': '100px', 'font-weight': 400 });

    deepEqual([
        el.style.fontSize, el.style.fontWeight
    ], [
        '100px', '400'
    ]);
});

test('write with undefined deletes property', function(){
    var newEl;

    newEl = document.createElement('div');
    newEl.style.fontSize = '14px';

    S(newEl)('font-size', undefined);

    equal(newEl.style.fontSize, '');
});

test('write background image with http URL', function(){
    S(el)('background-image', 'https://github.com/favicon.ico');

    equal(el.style.backgroundImage, 'url(https://github.com/favicon.ico)')
});

test('write background image without an explicit protocol', function(){
    S(el)('background-image', '//path/to/some/image.png');

    equal(el.style.backgroundImage, 'url(file://path/to/some/image.png)');
});

test('write CSS function as an array', function(){
    S(el)('top', ['calc', '50%']);

    equal(el.style.top, 'calc(50%)');
});

test('write CSS function as an array pixelifies numbers', function(){
    S(el)('top', ['calc', 225]);

    equal(el.style.top, 'calc(225px)');
});
