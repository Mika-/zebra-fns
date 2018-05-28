const START_CODE_A = 103;
const START_CODE_B = 104;
const START_CODE_C = 105;

const CHAR_CODE_OFFSET = 32;

const bars = [
    0b11011001100, 0b11001101100, 0b11001100110, 0b10010011000,
    0b10010001100, 0b10001001100, 0b10011001000, 0b10011000100,
    0b10001100100, 0b11001001000, 0b11001000100, 0b11000100100,
    0b10110011100, 0b10011011100, 0b10011001110, 0b10111001100,
    0b10011101100, 0b10011100110, 0b11001110010, 0b11001011100,
    0b11001001110, 0b11011100100, 0b11001110100, 0b11101101110,
    0b11101001100, 0b11100101100, 0b11100100110, 0b11101100100,
    0b11100110100, 0b11100110010, 0b11011011000, 0b11011000110,
    0b11000110110, 0b10100011000, 0b10001011000, 0b10001000110,
    0b10110001000, 0b10001101000, 0b10001100010, 0b11010001000,
    0b11000101000, 0b11000100010, 0b10110111000, 0b10110001110,
    0b10001101110, 0b10111011000, 0b10111000110, 0b10001110110,
    0b11101110110, 0b11010001110, 0b11000101110, 0b11011101000,
    0b11011100010, 0b11011101110, 0b11101011000, 0b11101000110,
    0b11100010110, 0b11101101000, 0b11101100010, 0b11100011010,
    0b11101111010, 0b11001000010, 0b11110001010, 0b10100110000,
    0b10100001100, 0b10010110000, 0b10010000110, 0b10000101100,
    0b10000100110, 0b10110010000, 0b10110000100, 0b10011010000,
    0b10011000010, 0b10000110100, 0b10000110010, 0b11000010010,
    0b11001010000, 0b11110111010, 0b11000010100, 0b10001111010,
    0b10100111100, 0b10010111100, 0b10010011110, 0b10111100100,
    0b10011110100, 0b10011110010, 0b11110100100, 0b11110010100,
    0b11110010010, 0b11011011110, 0b11011110110, 0b11110110110,
    0b10101111000, 0b10100011110, 0b10001011110, 0b10111101000,
    0b10111100010, 0b11110101000, 0b11110100010, 0b10111011110,
    0b10111101110, 0b11101011110, 0b11110101110, 0b11010000100,
    0b11010010000, 0b11010011100, 0b11000111010, 0b11010111000,
    0b1100011101011
];

const resolveCodeSet = (input) => {
    const setA = input.match(/([\x00-\x5F\xC8-\xCF]{1})/g);
    const setALength = setA ? setA.length : 0;

    const setB = input.match(/([\x20-\x7F\xC8-\xD3]{1})/g);
    const setBLength = setB ? setB.length : 0;

    const setC = input.match(/([0-9]{2}|\xCF{1})/g);
    const setCLength = setC ? setC.length*2 : 0;

    if (setCLength > 0 && (setCLength >= setALength && setCLength >= setBLength))
        return START_CODE_C;
    else if (setBLength > setALength)
        return START_CODE_B;
    
    return START_CODE_A;
}

const encodeBar = (character) => bars[character].toString(2);

export default (input) => {
    const startCode = resolveCodeSet(input);

    let sum = startCode;
    let str = '';
    let i = 0;
    let position = 0;

    str += encodeBar(startCode);

    while(i < input.length) {
        let value;

        if (startCode === START_CODE_C) {
            value = parseInt(input.charAt(i) + input.charAt(i + 1));
            i += 2;
        } else {
            value = input.charCodeAt(i) - CHAR_CODE_OFFSET;
            ++i;
        }

        sum += value * (position + 1);
        str += encodeBar(value);
        ++position;
    }

    str += encodeBar(sum % 103);
    str += encodeBar(108);

    return str;
}
