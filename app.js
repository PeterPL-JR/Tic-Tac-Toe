var writing, buttonAgain;
var divs = [];
var round = "circle";
var victory = false;
var uses = []
var figures = [];

function createBoard() {
    var cont = document.getElementById("container");
    var value = "";
    var indexes = [];

    for(var x = 0; x < 3; x++) {
        for(var y = 0; y < 3; y++) {
            var index = "id_" + x + "_" + y;
            indexes[x + y * 3] = index;
            value += "<div class='pole' id='" + index + "' onclick='setClick(" + x + "," + y + ");' onmouseover='mouseIn(" + x + "," + y + ");' onmouseout='mouseOut(" + x + "," + y + ");'></div>";
        }
        value += "<div style='clear: both'></div>";
    }
    cont.innerHTML = value;

    for(var i = 0; i < indexes.length; i++) {
        divs[i] = document.getElementById(indexes[i]);
        uses[i] = false;
    }
    for(var i = 0; i < 9; i++) {
        figures[i] = "null";
    }

    writing = document.getElementById("writing");
    buttonAgain = document.getElementById("buttonAgain");
}

function isTheSame(array) {
    var theSame = true;
    for(var i = 1; i < array.length; i++) {
        if(array[i] != array[i - 1]) {
            theSame = false;
            break;
        }
    }
    return theSame;
}
function isNull(array) {
    var isNull = false;
    for(var i = 0; i < array.length; i++) {
        if(array[i] == "null") {
            isNull = true;
            break;
        }
    }
    return isNull;
}

function isHorizontal(newFig) {
    var victory = false;

    for(var x = 0; x < 3; x++) {
        var array = new Array(3);
        for(var y = 0; y < 3; y++) {
            array[y] = newFig[x][y];
        }

        if(isNull(array)) {
            victory = false;
            continue;
        }

        if(isTheSame(array)) {
            victory = true;
            break;
        }
    }

    return victory;
}
function isVertical(newFig) {
    var victory = false;

    for(var y = 0; y < 3; y++) {
        var array = new Array(3);
        for(var x = 0; x < 3; x++) {
            array[x] = newFig[x][y];
        }

        if(isNull(array)) {
            victory = false;
            continue;
        }

        if(isTheSame(array)) {
            victory = true;
            break;
        }
    }

    return victory;
}

function isBackward1(newFig) {
    var victory = false;

    var array = new Array(3);
    for(var i = 0; i < 3; i++) {
        array[i] = newFig[i][i];
    }
    if(isNull(array)) {
        victory = false;
        return false;
    }

    if(isTheSame(array)) {
        victory = true;
    }

    return victory;
}
function isBackward2(newFig) {
    var victory = false;

    var array = new Array(3);
    for(var i = 0; i < 3; i++) {
        array[i] = newFig[i][2 - i];
    }
    if(isNull(array)) {
        victory = false;
        return false;
    }

    if(isTheSame(array)) {
        victory = true;
    }

    return victory;
}

function isVictory() {
    var victory = false;
    var newFig = [];

    for(var x = 0; x < 3; x++) {
        newFig[x] = [];
        for(var y = 0; y < 3; y++) {
            newFig[x][y] = figures[x + y * 3];
        }
    }

    victory = isHorizontal(newFig) || isVertical(newFig) || isBackward1(newFig) || isBackward2(newFig);
    return victory;
}

function isFull() {
    var full = true;
    for(var i = 0; i < figures.length; i++) {
        if(figures[i] == "null") {
            full = false;
            break;
        }
    }

    console.log(full);
    return full;
}

function mouseIn(xIndex, yIndex) {
    if(uses[xIndex + yIndex * 3]) return;
    if(victory) return;

    divs[xIndex + yIndex * 3].style.setProperty("background-color", "#898989");
    divs[xIndex + yIndex * 3].style.setProperty("border-color", "white");
}
function mouseOut(xIndex, yIndex) {
    divs[xIndex + yIndex * 3].style.setProperty("background-color", "#464646");
    divs[xIndex + yIndex * 3].style.setProperty("border-color", "#ababab");
}

function setClick(xIndex, yIndex) {
    if(uses[xIndex + yIndex * 3]) return;
    if(victory) return;

    figures[xIndex + yIndex * 3] = round;
    
    var div = divs[xIndex + yIndex * 3];
    div.style.setProperty("background-color", "#131313");
    uses[xIndex + yIndex * 3] = true;
    
    if(round == "cross") {
        div.innerHTML = "<img src='cross.png' width=100 height=100>";
    } else if(round == "circle") {
        div.innerHTML = "<img src='circle.png' width=100 height=100>";
    }

    if(isVictory()) {
        if(round == "cross") {
            writing.innerHTML = "<span style='color: #ababab'><span style='font-weight: bold;'>WINNER</span>:</span> <b>Cross</b>";
        }
        if(round == "circle") {
            writing.innerHTML = "<span style='color: #ababab'><span style='font-weight: bold;'>WINNER</span>:</span> <b>Circle</b>";
        }
        victory = true;
        buttonAgain.style.visibility = "visible";
        return;
    }
    
    if(isFull()) {
        writing.innerHTML = "<span style='color: #ababab'>Score: <b>Draw</b></span>"
        buttonAgain.style.visibility = "visible";
        return;
    }

    if(round == "cross") {
        writing.innerHTML = "<span style='color: #ababab'>Round:</span> <b>Circle</b>";
    }
    if(round == "circle") {
        writing.innerHTML = "<span style='color: #ababab'>Round:</span> <b>Cross</b>";
    }

    round = (round == "circle") ? "cross" : "circle";
}