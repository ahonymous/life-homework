(function() {
    var hasAce = !!window.ace,
        map,
        iteration,
        running,
        showDiv = document.querySelector('#output'),
        editor = hasAce ? ace.edit("editor") : document.querySelector('#editor');

    hasAce && editor.getSession().setMode("ace/mode/javascript");

    function initMap() {
        var i, j, size = 100;
        //var  x, y = 5,
        //    plane = [
            //    [true, true, true],
            //    [false, false, true],
            //    [false, true, false]
            //],
            //plane1 = [];
        map = [];
        iteration = 0;
        for (i = 0; i < size; i++) {
            map[i] = [];
            //if (!(i % y)) {
            //    plane1 = plane.map(function (val) {
            //        return val.slice(0, val.length);
            //    });
            //}
            //
            //if (plane1.length) {
            //    x = plane1.pop();
            //}

            for (j = 0; j < size; j++) {
                //map[i][j] = x.length ? x.pop() : false;
                map[i][j] = Math.random() > 0.5;
            }
        }
        show();
    }

    function show() {
        showDiv.innerHTML = 'Iteration ' + iteration + '\n<br><div>' + map.reduce(function(memo, row) {
            return memo + '<div class="row">' + row.map(function(val) {
                return '<div class="block' + (val ? ' alive' : ' ') + '"></div>';
            }).join('') + '</div>\n';
        }, '') + '</div>';
    }

    function step() {
        map = Life.step(map, iteration++);
        show();
    }

    function run() {
        running = true;
        step();
        setTimeout(function() {
            running && run();
        }, 50);
    }

    function stop() {
        running = false;
    }

    window.step = step;
    window.show = show;
    window.run = run;
    window.stop = stop;

    document.querySelector('#run').addEventListener('click', function(e) {
        e.preventDefault();
        initMap();
        eval(hasAce ? editor.getValue() : editor.textContent);
        run();
    });

    document.querySelector('#stop').addEventListener('click', function(e) {
        e.preventDefault();
        stop();
    });

    initMap();
})();
