var game = function (map) {
    var out = [],
        i, j, s,
        countLives = 0;

    for (s = 0; s < map.length; s++) {
        out.push([]);
    }

    var lives = function (x, y) {
        var m = (x - 1 in map) ? x - 1 : x,
            n = (y - 1 in map[m]) ? y - 1 : y,
            lives = 0,
            k, l;

        for (k = m; k < (x + 2); k++) {
            if (k in map) {
                for (l = n; l < (y + 2); l++) {
                    if ((k == x && l == y) || !(l in map[k])) {
                        continue;
                    }

                    if (map[k][l] === true) {
                        lives++;
                    }
                }
            }
        }

        return lives;
    };

    for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[i].length; j++) {
            countLives = lives(i, j);

            if (map[i][j] === false) {
                out[i][j] = (countLives == 3);
            } else if (map[i][j] === true) {
                out[i][j] = (countLives == 2 || countLives == 3);
            }
        }
    }

    return out;
};
