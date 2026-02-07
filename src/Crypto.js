let obj_encrypt = {
    a: 'c',
    b: 'd',
    c: 'e',
    d: 'f',
    e: 'g',
    f: 'h',
    g: 'i',
    h: 'j',
    i: 'k',
    j: 'l',
    k: 'm',
    l: 'n',
    m: 'o',
    n: 'p',
    o: 'q',
    p: 'r',
    q: 's',
    r: 't',
    s: 'u',
    t: 'v',
    u: 'w',
    v: 'x',
    w: 'y',
    x: 'z',
    y: '~',
    z: '^',

    A: 'C',
    B: 'D',
    C: 'E',
    D: 'F',
    E: 'G',
    F: 'H',
    G: 'I',
    H: 'J',
    I: 'K',
    J: 'L',
    K: 'M',
    L: 'N',
    M: 'O',
    N: 'P',
    O: 'Q',
    P: 'R',
    Q: 'S',
    R: 'T',
    S: 'U',
    T: 'V',
    U: 'W',
    V: 'X',
    W: 'Y',
    X: 'Z',
    Y: '{',
    Z: '¥'
}

let obj_decrypt = {
    c: 'a',
    d: 'b',
    e: 'c',
    f: 'd',
    g: 'e',
    h: 'f',
    i: 'g',
    j: 'h',
    k: 'i',
    l: 'j',
    m: 'k',
    n: 'l',
    o: 'm',
    p: 'n',
    q: 'o',
    r: 'p',
    s: 'q',
    t: 'r',
    u: 's',
    v: 't',
    w: 'u',
    x: 'v',
    y: 'w',
    z: 'x',
    '~': 'y',
    '^': 'z',
    C: 'A',
    D: 'B',
    E: 'C',
    F: 'D',
    G: 'E',
    H: 'F',
    I: 'G',
    J: 'H',
    K: 'I',
    L: 'J',
    M: 'K',
    N: 'L',
    O: 'M',
    P: 'N',
    Q: 'O',
    R: 'P',
    S: 'Q',
    T: 'R',
    U: 'S',
    V: 'T',
    W: 'U',
    X: 'V',
    Y: 'W',
    Z: 'X',
    '{': 'Y',
    '¥': 'Z'
}

export function encrypt(str) {
    if (str == null || str == undefined) return '';
    let temp = ''
    for (let i = str.length - 1; i >= 0; i--) {
        temp += (obj_encrypt[str[i]] == undefined ? str[i] : obj_encrypt[str[i]])
    }
    return temp.trim()
}

export function decrypt(str) {
    if (str == null || str == undefined) return '';
    let temp = ''
    for (let i = str.length - 1; i >= 0; i--) {
        temp += (obj_decrypt[str[i]] == undefined ? str[i] : obj_decrypt[str[i]])
    }
    return temp.trim()
}

const num_to_ch = {
    '1': 'a',
    '2': 'b',
    '3': 'c',
    '4': 'd',
    '5': 'e',
    '6': 'f',
    '7': 'g',
    '8': 'h',
    '9': 'i',
    '0': 'j'
}

const ch_to_num = {
    'a': '1',
    'b': '2',
    'c': '3',
    'd': '4',
    'e': '5',
    'f': '6',
    'g': '7',
    'h': '8',
    'i': '9',
    'j': '0'
}

export function encryptPhone(str) {
    if (str == null || str == undefined) return '';
    let temp = '';
    for (let i = 0; i < str.length; i++) {
        temp += (num_to_ch[str[i]] == undefined ? str[i] : num_to_ch[str[i]])
    }
    return temp;
}

export function decryptPhone(str) {
    if (str == null || str == undefined) return '';
    let temp = ''
    for (let i = 0; i < str.length; i++) {
        temp += (ch_to_num[str[i]] == undefined ? str[i] : ch_to_num[str[i]])
    }
    return temp
}

const num_to_pass = {
    '1': '9',
    '2': '8',
    '3': '7',
    '4': '6',
    '5': '5',
    '6': '4',
    '7': '3',
    '8': '2',
    '9': '1',
    '0': '0'
}

const pass_to_num = {
    '9': '1',
    '8': '2',
    '7': '3',
    '6': '4',
    '5': '5',
    '4': '6',
    '3': '7',
    '2': '8',
    '1': '9',
    '0': '0'
}

export function encryptPass(str) {
    if (str == null || str == undefined) return '';
    let temp = '';
    for (let i = 0; i < str.length; i++) {
        temp += (num_to_pass[str[i]] == undefined ? str[i] : num_to_pass[str[i]])
    }
    return temp.trim();
}

export function decryptPass(str) {
    if (str == null || str == undefined) return '';
    let temp = ''
    for (let i = 0; i < str.length; i++) {
        temp += (pass_to_num[str[i]] == undefined ? str[i] : pass_to_num[str[i]])
    }
    return temp.trim()
}