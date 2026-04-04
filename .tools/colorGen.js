/*
==================
    HOW TO USE
==================

Install the AutoClass plugin
Group your notes in folders
Group your folders in groups
Define those groups in "groups"
    Each element of "groups" is an array containing strings that are the names of those folders
Define the color parameters in "colors"
    Each element of "colors" is an object with the same name as one of the groups
    Those objects contain the color parameters

Update .obsidian/plugins/auto-class/data.json every time group list changes - the output is the content of "matches": [], you may have more data beside it
Update .obsidian/snippes/whatever.css every time parameters or group list change - the output is normal CSS, you may have more classes beside it
Update .obsidian/graph.json every time parameters or group list change - the output is the content of "colorGroups": [], you may have more data beside it

*/

// Parameters:

let groups = {
    red: ["AM", "FeMS", "DEM", "CSMN", "MD"],
    orange: ["RC", "ISW", "ARE"],
    yellow: ["PR1", "ASD", "SO", "PR2"],
    green: ["BD", "FPW", "IUM"],
    blue: ["FDI", "ALF", "LiP", "Logica"],
    purple: ["EED"]
}

/*
    This object defines the gradients in the OKLCH color space
    minL and maxL are the starting and ending luminance (brightness)
    minC and maxC are the starting and ending chroma (saturation)
    minH and maxH are the starting and ending hue
    Since hue loops, the color gradient can go in either direction, so you need to specify using signH
        +1: red->orange->yellow->green->blue->purple->red
        -1: red->purple->blue->green->yellow->orange->red
*/
let colors = {
    red : {
        minL: 0.5,
        maxL: 0.6,
        minC: 0.15,
        maxC: 0.15,
        minH: 30,
        maxH: 345,
        signH: -1
    },
    orange : {
        minL: 0.5,
        maxL: 0.66,
        minC: 0.15,
        maxC: 0.15,
        minH: 65,
        maxH: 50,
        signH: -1
    },
    yellow : {
        minL: 0.60,
        maxL: 0.75,
        minC: 0.18,
        maxC: 0.12,
        minH: 105,
        maxH: 105,
        signH: -1
    },
    green : {
        minL: 0.5,
        maxL: 0.75,
        minC: 0.15,
        maxC: 0.15,
        minH: 150,
        maxH: 140,
        signH: -1
    },
    blue : {
        minL: 0.48,
        maxL: 0.62,
        minC: 0.18,
        maxC: 0.12,
        minH: 260,
        maxH: 220,
        signH: -1
    },
    purple : {
        minL: 0.55,
        maxL: 0.55,
        minC: 0.15,
        maxC: 0.15,
        minH: 280,
        maxH: 280,
        signH: -1
    }
}






// this section is taken from https://gist.github.com/dkaraush/65d19d61396f5f3cd8ba7d1b4b3c9432, itself from https://github.com/color-js/color.js/blob/main/src/spaces/oklch.js

const multiplyMatrices = (A, B) => {
    return [
        A[0]*B[0] + A[1]*B[1] + A[2]*B[2],
        A[3]*B[0] + A[4]*B[1] + A[5]*B[2],
        A[6]*B[0] + A[7]*B[1] + A[8]*B[2]
    ];
}

const oklch2oklab = ([l, c, h]) => [
    l,
    isNaN(h) ? 0 : c * Math.cos(h * Math.PI / 180),
    isNaN(h) ? 0 : c * Math.sin(h * Math.PI / 180)
]
const oklab2oklch = ([l, a, b]) => [
    l,
    Math.sqrt(a ** 2 + b ** 2),
    Math.abs(a) < 0.0002 && Math.abs(b) < 0.0002 ? NaN : (((Math.atan2(b, a) * 180) / Math.PI % 360) + 360) % 360
];

const rgb2srgbLinear = rgb => rgb.map(c => 
    Math.abs(c) <= 0.04045 ?
        c / 12.92 : 
        (c < 0 ? -1 : 1) * (((Math.abs(c) + 0.055) / 1.055) ** 2.4)
)
const srgbLinear2rgb = rgb => rgb.map(c =>
    Math.abs(c) > 0.0031308 ?
        (c < 0 ? -1 : 1) * (1.055 * (Math.abs(c) ** (1 / 2.4)) - 0.055) :
        12.92 * c
)

const oklab2xyz = lab => {
    const LMSg = multiplyMatrices([
        1,  0.3963377773761749,  0.2158037573099136,
        1, -0.1055613458156586, -0.0638541728258133,
        1, -0.0894841775298119, -1.2914855480194092,
    ], lab)
    const LMS = LMSg.map(val => val ** 3)
    return multiplyMatrices([
         1.2268798758459243, -0.5578149944602171,  0.2813910456659647,
        -0.0405757452148008,  1.1122868032803170, -0.0717110580655164,
        -0.0763729366746601, -0.4214933324022432,  1.5869240198367816
    ], LMS)
}
const xyz2oklab = xyz => {
    const LMS = multiplyMatrices([
        0.8190224379967030, 0.3619062600528904, -0.1288737815209879,
        0.0329836539323885, 0.9292868615863434,  0.0361446663506424,
        0.0481771893596242, 0.2642395317527308,  0.6335478284694309
    ], xyz);
    const LMSg = LMS.map(val => Math.cbrt(val));
    return multiplyMatrices([
        0.2104542683093140,  0.7936177747023054, -0.0040720430116193,
        1.9779985324311684, -2.4285922420485799,  0.4505937096174110,
        0.0259040424655478,  0.7827717124575296, -0.8086757549230774
    ], LMSg);
}
const xyz2rgbLinear = xyz => {
    return multiplyMatrices([
        3.2409699419045226,  -1.537383177570094,   -0.4986107602930034,
       -0.9692436362808796,   1.8759675015077202,   0.04155505740717559,
        0.05563007969699366, -0.20397695888897652,  1.0569715142428786
    ], xyz)
}
const rgbLinear2xyz = rgb => {
    return multiplyMatrices([
        0.41239079926595934, 0.357584339383878,   0.1804807884018343,
        0.21263900587151027, 0.715168678767756,   0.07219231536073371,
        0.01933081871559182, 0.11919477979462598, 0.9505321522496607
    ], rgb)
}

const oklch2rgb = lch => 
    srgbLinear2rgb(xyz2rgbLinear(oklab2xyz(oklch2oklab(lch))))
const rgb2oklch = rgb =>
    oklab2oklch(xyz2oklab(rgbLinear2xyz(rgb2srgbLinear(rgb))))








Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};










// my code starts here

for(let i in colors)
    colors[i].n = groups[i].length

class Color {
    constructor(L, C, H) {
        this.L = L
        this.C = C
        this.H = H
    }

    toString() {
        return `oklch(${this.L} ${this.C} ${this.H})`
    }

    toArray() {
        return [this.L, this.C, this.H]
    }
}

function generate(n, minL, maxL, minC, maxC, minH, maxH, signH) {
    if(maxH<minH && signH>0) maxH+=360
    if(maxH>minH && signH<0) minH+=360
    let arr = []
    let deltaL
    let deltaC
    let deltaH
    if(n>1) {
        deltaL = (maxL-minL)/(n-1)
        deltaC = (maxC-minC)/(n-1)
        deltaH = (maxH-minH)/(n-1)
    } else {
        deltaL = minL
        deltaC = minC
        deltaH = minH
    }
    for(let i=0; i<n; i++)
        arr.push(new Color(minL+i*deltaL, minC+i*deltaC, (Math.floor(minH+i*deltaH)+720)%360))
    return arr
}

let deltaL = {
    light : -0.15,
    dark : +0.05,
    graph : 0
}

function generateFromSettings(group, context) {
    return generate(group.n, group.minL+deltaL[context], group.maxL+deltaL[context], group.minC, group.maxC, group.minH, group.maxH, group.signH)
}

function rgbArrayToHexString(arr) {
    return "#" + arr[0].toString(16).padStart(2, '0') + arr[1].toString(16).padStart(2, '0') + arr[2].toString(16).padStart(2, '0')
}

function rgbArrayToDec(arr) {
    return arr[0]*256*256+arr[1]*256+arr[2]
}


function oneFolderStringGraph(folder, color) {return `{
    "query": "path:${folder}/",
    "color": {
    "a": 1,
    "rgb": ${color}
    }
},
`}

function oneIndexStringGraph(group, index) {
    return oneFolderStringGraph(groups[group][index], rgbArrayToDec(oklch2rgb(generateFromSettings(colors[group], "graph")[index].toArray()).map(i => Math.floor(i*256).clamp(0,255))))
}

function generateAllGroupsGraph() {
    let out = ""
    for(let i in groups)
        for(let j in groups[i])
            out += oneIndexStringGraph(i, j)
    return out
}

function oneIndexStringAutoClass(group, index) {
    return `
{
    "path": "${groups[group][index]}",
    "scope": "Read & Edit",
    "classes": [
    "${groups[group][index].toLowerCase()}"
    ]
},`
}

function generateAllAutoClassClasses() {
    let out = ""
    for(let i in groups)
        for(let j in groups[i])
            out += oneIndexStringAutoClass(i, j)
    return out
}

function oneIndexStringCss(group, index) {
    let dark = rgbArrayToHexString(oklch2rgb(generateFromSettings(colors[group], "dark")[index].toArray()).map(i => Math.floor(i*256).clamp(0,255)))
    let light = rgbArrayToHexString(oklch2rgb(generateFromSettings(colors[group], "light")[index].toArray()).map(i => Math.floor(i*256).clamp(0,255)))
    return `
.${groups[group][index].toLowerCase()} {
  --accent-dark: ${dark};
  --accent-light: ${light};
}`
}

function generateAllCssClasses() {
    let out = ""
    for(let i in groups)
        for(let j in groups[i])
            out += oneIndexStringCss(i, j)
    out += `
.theme-dark * {
    --accent: var(--accent-dark);
    --accent-inverse: var(--accent-light);
}
.theme-light * {
    --accent: var(--accent-light);
    --accent-inverse: var(--accent-dark);
}
* {
    --link-color: var(--accent);
    --text-accent: var(--accent);
    --link-color: var(--accent);
    --caret-color: var(--accent);
    --blockquote-border-color: var(--accent);
    --text-selection: var(--accent-inverse);
}
::spelling-error {
  text-decoration: wavy var(--accent) underline;
}
.math {
  color: var(--accent);
}`
    return out
}

// Update .obsidian/plugins/auto-class/data.json every time group list changes
console.log(`
======================================
.obsidian/plugins/auto-class/data.json
======================================`)
console.log(generateAllAutoClassClasses())

// Update .obsidian/snippes/whatever.css every time parameters or group list change
console.log(`
==============================
.obsidian/snippes/whatever.css
==============================`)
console.log(generateAllCssClasses())

// Update .obsidian/graph.json every time parameters or group list change
console.log(`
====================
.obsidian/graph.json
====================`)
console.log(generateAllGroupsGraph())