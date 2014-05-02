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

