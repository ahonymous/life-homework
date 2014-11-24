Array.prototype.max = function () {
    return Math.max.apply(Math, this);
};

var cups = function (wall) {
    var i,
        smallSquare,
        max = wall.indexOf(wall.max()),
        getCups = function (smallWall) {
            var out = [{
                start: 0,
                end: 0,
                square: 0
            }];

            for (i = 0; i < smallWall.length; i++) {
                if (out[out.length - 1].square > 0 && smallWall[i] > smallWall[out[out.length - 1].start]) {
                    out[out.length - 1].end = i;
                    if (out[out.length - 1].end < out[out.length - 1].start) {
                        out[out.length - 1].square -= (out[out.length - 1].count * (out[out.length - 1].start - out[out.length - 1].end));
                    }
                    out.push({
                        start: i,
                        end: i,
                        square: 0
                    });
                }

                if (smallWall[i] > smallWall[out[out.length - 1].start]) {
                    out[out.length - 1].start = i;
                } else {
                    smallSquare = smallWall[out[out.length - 1].start] - smallWall[i];
                    out[out.length - 1].square += smallSquare;
                }
            }

            return out;
        };

    smallSquare = 0;

    getCups(wall.slice(0, max)).concat(getCups(wall.slice(max + 1).reverse())).filter(function (val) {
        smallSquare += val.square;

        return val.square;
    });

    return smallSquare;
};

var arr = [];
var tt = function () {
    var i = [5, 4];
    arr.push(i.pop());

    console.log(arr, i);
};
