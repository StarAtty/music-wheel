var textSet = 0;
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

function switchText() {
    textSet += 1;
    set = textSet % 2;
    switchTextButton.innerText = (set) ? "相生排序" : "半音排序";
    for(let i = 0; i < 12; i++){
        document.getElementById('wheel1').childNodes[i*2+1].innerHTML = '<div class="text">' + wheel1Texts[set][i] + "</div>";
        document.getElementById('wheel2').childNodes[i*2+1].innerHTML = '<div class="text">' + wheel2Texts[set][i] + "</div>";
        document.getElementById('wheel3').childNodes[i*2+1].innerHTML = '<div class="text">' + wheel3Texts[set][i] + "</div>";
    }
}

switchTextButton.addEventListener('click', switchText);

var bound = true;

switchWheelButton.addEventListener('click', function() {
    if (bound) {
        innerWheel.unbind();
        outerWheel.bind();
        document.getElementById("wheel3").style.zIndex = 50;
        switchWheelButton.innerText = "轉外圈";
        bound = false;
    } else {
        innerWheel.bind();
        outerWheel.unbind();
        document.getElementById("wheel3").style.zIndex = -100;
        switchWheelButton.innerText = "轉內圈";
        bound = true;
    }
});

resetButton.addEventListener('click', function() {
    innerWheel.bind();
    outerWheel.unbind();
    document.getElementById("wheel3").style.zIndex = -100;
    switchWheelButton.innerText = "轉內圈";
    bound = true;
    innerWheel.speed = 0;
    outerWheel.speed = 0;
    innerWheel.angle = 45;
    outerWheel.angle = 45;
    if(set) switchText();
});

var innerWheel = new Propeller(document.getElementById('rotate'), {
    inertia: 0.98, angle: 45,
    onDragStop: function() {
        console.log('stop');
    },
    onDragStart: function() {
        console.log('start');
    }
});
var outerWheel = new Propeller(document.getElementById('wheel3'), {
    inertia: 0.98, angle: 45, 
    onDragStop: function() {
        console.log('stop');
    },
    onDragStart: function() {
        console.log('start');
    }
});