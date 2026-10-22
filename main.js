(function() {
    let hasAce = !!window.ace,
        map,
        iteration,
        running = false,
        timer,
        mapHashes,
        runButton = document.querySelector('#run'),
        showDiv = document.querySelector('#output'),
        iterationText = document.createTextNode(''),
        grid = document.createElement('div'),
        editor = hasAce ? ace.edit("editor") : document.querySelector('#editor');

    hasAce && editor.getSession().setMode("ace/mode/javascript");

    showDiv.appendChild(iterationText);
    showDiv.appendChild(document.createElement('br'));
    showDiv.appendChild(grid);

    function initMap() {
        let i, j, size = 190;
        map = [];
        iteration = 0;
        mapHashes = null;
        for (i = 0; i < size; i++) {
            map[i] = [];

            for (j = 0; j < size; j++) {
                map[i][j] = Math.random() > 0.5;
            }
        }
        show();
    }

    function show() {
        let i, j, row, cell, className;

        iterationText.nodeValue = 'Iteration ' + iteration;
        while (grid.children.length > map.length) {
            grid.removeChild(grid.lastChild);
        }

        for (i = 0; i < map.length; i++) {
            row = grid.children[i];
            if (!row) {
                row = document.createElement('div');
                row.className = 'row';
                grid.appendChild(row);
            }

            while (row.children.length > map[i].length) {
                row.removeChild(row.lastChild);
            }

            for (j = 0; j < map[i].length; j++) {
                cell = row.children[j];
                if (!cell) {
                    cell = document.createElement('div');
                    row.appendChild(cell);
                }

                className = map[i][j] ? 'block alive' : 'block';
                if (cell.className !== className) {
                    cell.className = className;
                }
            }
        }
    }

    function getMapHash() {
        var i, j, first = 2166136261, second = 5381;

        function add(value) {
            first ^= value;
            first = (first + (first << 1) + (first << 4) + (first << 7) +
                (first << 8) + (first << 24)) >>> 0;
            second = ((second << 5) + second) ^ value;
        }

        for (i = 0; i < map.length; i++) {
            for (j = 0; j < map[i].length; j++) {
                add(map[i][j] ? 1 : 0);
            }
            add(2); // Separate rows so different map shapes have different input.
        }

        return first.toString(16) + ':' + (second >>> 0).toString(16);
    }

    function step() {
        var hash, previousIteration;

        if (!mapHashes) {
            mapHashes = Object.create(null);
            mapHashes[getMapHash()] = iteration;
        }

        map = Life.step(map, iteration++);
        show();
        hash = getMapHash();
        previousIteration = mapHashes[hash];
        if (previousIteration !== undefined) {
            console.log('Виявлено цикл: ітерація ' + iteration +
                ' повторює ітерацію ' + previousIteration +
                ' (період ' + (iteration - previousIteration) + '). Симуляцію зупинено.');
            stop();
        } else {
            mapHashes[hash] = iteration;
        }
    }

    function tick() {
        step();
        if (running) {
            timer = setTimeout(tick, 50);
        }
    }

    function run() {
        if (running) {
            return;
        }

        running = true;
        runButton.disabled = true;
        mapHashes = null;
        tick();
    }

    function stop() {
        running = false;
        clearTimeout(timer);
        runButton.disabled = false;
    }

    window.step = step;
    window.show = show;
    window.run = run;
    window.stop = stop;

    runButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (running) {
            return;
        }

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
