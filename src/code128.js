const START_CODE_A = 103;
const START_CODE_B = 104;
const START_CODE_C = 105;

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

export default (input) => {
    const startCode = resolveCodeSet(input);
}
