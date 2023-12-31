"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.generateTourCode = exports.generateCodeOrder = void 0;
const generateCodeOrder = (number) => {
    const code = `OD${String(number).padStart(8, `0`)}`;
    return code;
};
exports.generateCodeOrder = generateCodeOrder;
const generateTourCode = (number) => {
    const code = `TOUR${String(number).padStart(6, '0')}`;
    return code;
};
exports.generateTourCode = generateTourCode;
const generateToken = (number) => {
    const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < number; i++) {
        result += character[Math.floor(Math.random() * character.length)];
    }
    return result;
};
exports.generateToken = generateToken;
