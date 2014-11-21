var game = function (map) {
    var out = [],
        i, j, s,
        countLives = 0;

    for (s = 0; s < map.length; s++) {
        out.push([]);
    }

    var lives = function (x, y) {
        var m = [(x - 1) < 0 ? map.length - 1 :  x - 1, x, (x + 1) == map.length ? 0 : x + 1],
            n = [(y - 1) < 0 ? map[x].length - 1 : y - 1, y, (y + 1) == map[x].length ? 0 : y + 1],
            lives = 0,
            k, l;

        for (k = 0; k <= 2; k++) {
            for (l = 0; l <= 2; l++) {
                if (m[k] == x && n[l] == y) {
                    continue;
                }

                if (map[m[k]][n[l]]) {
                    lives++;
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
