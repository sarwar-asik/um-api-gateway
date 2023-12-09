"use strict";
//['page','limit','sortBy','sortOrder']
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    // console.log(finalObj,'fffffffff');
    return finalObj;
};
exports.default = pick;
