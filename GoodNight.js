var STAR_COUNT = 40;
var STAR_Z_INDEX = 100500;
var SVG_NAME_SPACE = "http://www.w3.org/2000/svg";
var STAR = {
    PRINT: "M 200.30535,69.729172 C 205.21044,69.729172 236.50709,141.52218 240.4754,144.40532 C 244.4437,147.28846 322.39411,154.86809 323.90987,159.53312 C 325.42562,164.19814 266.81761,216.14828 265.30186,220.81331 C 263.7861,225.47833 280.66544,301.9558 276.69714,304.83894 C 272.72883,307.72209 205.21044,268.03603 200.30534,268.03603 C 195.40025,268.03603 127.88185,307.72208 123.91355,304.83894 C 119.94524,301.9558 136.82459,225.47832 135.30883,220.8133 C 133.79307,216.14828 75.185066,164.19813 76.700824,159.53311 C 78.216581,154.86809 156.16699,147.28846 160.13529,144.40532 C 164.1036,141.52218 195.40025,69.729172 200.30535,69.729172 z ",
    STYLE: "opacity:1;fill:#ffff00;fill-opacity:1;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
};


var Star = (function () {
    function Star(width, height, rotate, left, top) {
        this.width = width;
        this.height = height;
        this.rotate = rotate;
        this.left = left;
        this.top = top;
        this.initElement();
    }

    Star.prototype.initElement = function () {
        this.svgLink = document.createElementNS(SVG_NAME_SPACE, "svg");
        this.svgLink.setAttribute("width", this.width);
        this.svgLink.setAttribute("height", this.height);
        this.svgLink.style.zIndex = STAR_Z_INDEX;
        this.svgLink.style.position = "absolute";
        this.svgLink.style.left = this.left;
        this.svgLink.style.top = this.top;
        this.pahtLink = document.createElementNS(SVG_NAME_SPACE, "path");
        this.updateTransform();
        this.pahtLink.setAttribute("d", STAR.PRINT);
        this.pahtLink.setAttribute("style", STAR.STYLE);
        this.svgLink.appendChild(this.pahtLink);
        document.body.appendChild(this.svgLink);
    };

    Star.prototype.setWidth = function (newWidth) {
        this.width = newWidth;
        this.svgLink.setAttribute("width", this.width);
        this.updateTransform();
    };

    Star.prototype.setHeight = function (newHeight) {
        this.height = newHeight;
        this.svgLink.setAttribute("height", this.height);
        this.updateTransform();
    };

    Star.prototype.setTop = function (newTop) {
        this.top = newTop;
        this.svgLink.style.top = this.top;
    };

    Star.prototype.moveDown = function (count) {
        this.setTop(this.top + count);
    };

    Star.prototype.setLeft = function (newLeft) {
        this.left = newLeft;
        this.svgLink.style.left = this.left;
    };

    Star.prototype.moveRight = function (count) {
        this.setLeft(this.left + count);
    };

    Star.prototype.doRotate = function (rotate) {
        this.rotate = rotate;
        this.updateTransform();
    };

    Star.prototype.doRotateToRight = function (count) {
        this.doRotate(this.rotate += count);
    };

    Star.prototype.updateTransform = function () {
        var rotate = "rotate(" + this.rotate + ", " + this.width / 2 + ", " + this.height / 2 + ")";
        var scale = "scale(" + this.getScaleValue(this.width) + ", " + this.getScaleValue(this.height) + ")";
        this.pahtLink.setAttribute("transform", rotate + " " + scale);
    };

    Star.prototype.getScaleValue = function (value) {
        return (value / 400 * 100) / 100.0;
    };

    return Star;
}());

var Engine = (function () {
    function Engine(target, callback, speed) {
        this.target = target;
        var self = this;
        setInterval(function () {
            callback(self.target);
        }, speed);
    }

    return Engine;
}());

var starList = [];

for (var i = 0; i < STAR_COUNT; i++) {
    var star = new Star(100, 100, 0, 0, getRandom(10, document.documentElement.clientHeight));

    star.randomView = function () {
        this.setLeft(getRandom(10, document.body.clientWidth));
        this.doRotate(getRandom(0, 360));
        var side = getRandom(10, 200);
        this.setWidth(side);
        this.setHeight(side);
    };

    starList.push(star);

    star.randomView();

    new Engine(star, function (target) {
        target.moveDown(1);
        target.doRotateToRight(1);

        if(getRandom(0, 10) > 8) {
            target.moveRight(-1);
        }

        if (target.top >= document.documentElement.clientHeight + 50) {
            target.setTop(-100);
            target.randomView();
        }
    }, getRandom(5, 20));
}

function getRandom(from, to) {
    return Math.floor((Math.random() * to) + from);
}

function appendHtml(element, html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    while (div.children.length > 0) {
        element.appendChild(div.children[0]);
    }
}

appendHtml(document.body, "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"460\" height=\"460\" style=\'position: absolute; z-index: 100501; left: 30px; top: 30px;\'>\n    <path transform=\'scale(0.3,0.3)\' fill=\"#00F\" d=\"m130,24a228,228 0 0,0 317,276a228,228 0 1,1-317-276\"/>\n</svg>");