var textSet = 1;
var set = 0;
var wheel1Texts = [["黃鐘", "大呂", "太簇", "夾鐘", "姑洗", "仲呂", "蕤賓", "林鐘", "夷則", "南呂", "無射", "應鐘"],
["黃鐘", "林鐘", "太簇", "南呂", "姑洗", "應鐘", "蕤賓", "大呂", "夷則", "夾鐘", "無射", "仲呂"]];
var wheel2Texts = [["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"],
["C", "G", "D", "A", "E", "B", "F♯/G♭", "C♯/D♭", "G♯/A♭", "D♯/E♭", "A♯/B♭", "F"]];
var wheel3Texts = [["宮", "", "商", "", "角", "", "變徵", "徵", "", "羽", "", "變宮"],
["宮", "徵", "商", "羽", "角", "變宮", "變徵", "", "", "", "", ""]];

var switchWheelButton = document.getElementById('switchWheel');
var switchTextButton = document.getElementById('switchText');
var resetButton = document.getElementById('reset');
var alignButton = document.getElementById('align');

var subtractionButton = document.getElementById('subtraction');
var additionButton = document.getElementById('addition');
var resetLengthButton = document.getElementById('resetLength');
var undoButton = document.getElementById('undo');
var theString = document.getElementById('string');
var stringLength = document.getElementById('stringLength');

var indicator = document.getElementById('indicator');

var indicatorDegree = -45;
var propotion = Math.pow(2, 7 / 12) * 2 / 3;

var stringValue = 81;
var clickCounter = 0;

var steps = [];

function switchText() {
    textSet += 1;
    set = textSet % 2;
    for (let i = 0; i < 12; i++) {
        document.getElementById('wheel1').childNodes[i * 2 + 1].innerHTML = '<div class="text">' + wheel1Texts[set][i] + "</div>";
        document.getElementById('wheel2').childNodes[i * 2 + 1].innerHTML = '<div class="text">' + wheel2Texts[set][i] + "</div>";
        document.getElementById('wheel3').childNodes[i * 2 + 1].innerHTML = '<div class="text">' + wheel3Texts[set][i] + "</div>";
    }
    if (clickCounter % 2) {
        indicatorDegree += 180;
        rotateIndicator();
    }
}

switchTextButton.addEventListener('click', switchText);

var bound = false;

switchWheelButton.addEventListener('click', function () {
    if (bound) {
        innerWheel.unbind();
        outerWheel.bind();
        document.getElementById("wheel3").style.zIndex = 50;
        switchWheelButton.innerText = "轉內圈";
        bound = false;
    } else {
        innerWheel.bind();
        outerWheel.unbind();
        document.getElementById("wheel3").style.zIndex = -100;
        switchWheelButton.innerText = "轉外圈";
        bound = true;
    }
});

resetButton.addEventListener('click', function () {
    innerWheel.unbind();
    outerWheel.bind();
    document.getElementById("wheel3").style.zIndex = 50;
    switchWheelButton.innerText = "轉內圈";
    bound = false;
    innerWheel.speed = 0;
    outerWheel.speed = 0;
    innerWheel.angle = 45;
    outerWheel.angle = 45;
    if (set) switchText();
});

alignButton.addEventListener('click', function () {
    innerWheel.speed = 0;
    outerWheel.speed = 0;
    let innerWheelOffset = (innerWheel.angle - 15) % 30;
    let outerWheelOffset = (outerWheel.angle - 15) % 30;
    innerWheel.angle += (innerWheelOffset > 15) ? (30 - innerWheelOffset) : (-innerWheelOffset);
    outerWheel.angle += (outerWheelOffset > 15) ? (30 - outerWheelOffset) : (-outerWheelOffset);
});

function rotateIndicator() {
    indicator.style.transform = "rotate(" + indicatorDegree + "deg)";
}

function clickRotate() {
    if (set) {
        indicatorDegree += 30 * propotion;
    } else {
        indicatorDegree += 210 * propotion;
    }

    clickCounter++;
    rotateIndicator();
}

function setStringValue(strVal) {
    stringValue *= strVal;
    theString.value = stringValue;
    stringLength.innerText = theString.value;
}

subtractionButton.addEventListener('click', function () {
    setStringValue(2 / 3);
    steps.push(3 / 2);
    clickRotate();
    undoButton.disabled = false;
    if (stringValue <= 60.75) {
        additionButton.disabled = false;
    }
});

function checkStringLength () {
    if (stringValue > 60.75) {
        additionButton.disabled = true;
    }
}

additionButton.addEventListener('click', function () {
    setStringValue(4 / 3);
    steps.push(3 / 4);
    clickRotate();
    undoButton.disabled = false;
    checkStringLength();
});

resetLengthButton.addEventListener('click', function () {
    theString.value = 81;
    stringValue = 81;
    stringLength.innerText = theString.value;
    additionButton.disabled = true;
    indicatorDegree = -45;
    indicator.style.transform = "rotate(-45deg)";
    clickCounter = 0;
    undoButton.disabled = true;
    steps = [];
});

theString.addEventListener('change', function () {
    stringValue = theString.value;
});

theString.addEventListener('input', function () {
    stringLength.innerText = theString.value;
});

undoButton.addEventListener('click', function () {
    propotion *= -1;
    clickCounter--;
    setStringValue(steps.pop());
    clickRotate();
    propotion *= -1;
    checkStringLength();
    if (steps.length == 0) undoButton.disabled = true;
});

var innerWheel = new Propeller(document.getElementById('rotate'), {
    inertia: 0.98, angle: 45,
    onDragStop: function () {
        console.log('stop');
    },
    onDragStart: function () {
        console.log('start');
    }
});

var outerWheel = new Propeller(document.getElementById('wheel3'), {
    inertia: 0.98, angle: 45,
    onDragStop: function () {
        console.log('stop');
    },
    onDragStart: function () {
        console.log('start');
    }
});