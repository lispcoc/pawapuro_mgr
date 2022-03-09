const rankData = [{
    rank: "G",
    min: 0,
    max: 19,
    color: "#000000"
}, {
    rank: "F",
    min: 20,
    max: 39,
    color: "#4f81bd"
}, {
    rank: "E",
    min: 40,
    max: 49,
    color: "#00b050"
}, {
    rank: "D",
    min: 50,
    max: 59,
    color: "#ffc000"
}, {
    rank: "C",
    min: 60,
    max: 69,
    color: "#f79646"
}, {
    rank: "B",
    min: 70,
    max: 79,
    color: "#ff0000"
}, {
    rank: "A",
    min: 80,
    max: 89,
    color: "#d99594"
}, {
    rank: "S",
    min: 90,
    max: 100,
    color: "#e5b8b7"
}, ];

const dandoData = [{
    num: 1,
    text: "→",
    color: "#ffc000"
}, {
    num: 2,
    text: "↗",
    color: "#f79646"
}, {
    num: 3,
    text: "↗",
    color: "#ff0000"
}, {
    num: 4,
    text: "↗",
    color: "#d99594"
}];

const params = [
    { id: "name", title: "名前", type: "name", width: '100' },
    { id: "hand", title: "利き腕", type: "pos", jexcelType: 'dropdown', source: ["右投右打", "右投左打", "右投両打", "左投左打", "左投右打", "左投両打"] },
    { id: "pos", title: "守備位置", type: "pos", width: '100' },
    { id: "dando", title: "弾道", type: "dando", statusType: "f" },
    { id: "meet", title: "ミート", type: "status", statusType: "f" },
    { id: "power", title: "パワー", type: "status", statusType: "f" },
    { id: "run", title: "走力", type: "status", statusType: "f" },
    { id: "arm", title: "肩力", type: "status", statusType: "f" },
    { id: "def", title: "守備力", type: "status", statusType: "f" },
    { id: "err", title: "捕球", type: "status", statusType: "f" },
    { id: "speed", title: "球速", type: "status_no_rank", statusType: "p" },
    { id: "control", title: "コントロール", type: "status", statusType: "p" },
    { id: "stamina", title: "スタミナ", type: "status", statusType: "p" },
    { id: "breaking", title: "変化球", type: "breaking", statusType: "p", width: '150' },
    { id: "special_f", title: "特殊能力(野手)", type: "special", width: '150', statusType: "f" },
    { id: "special_p", title: "特殊能力(投手)", type: "special", width: '150', statusType: "p" },
];

const dirText = {
    u: "↑",
    l: "←",
    r: "→",
    d: "↓",
    ld: "↙",
    rd: "↘"
};

const posColorId = {
    "外": "outfielder"
}