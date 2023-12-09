"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingsValidation = void 0;
const zod_1 = require("zod");
const createBuildings = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is Required (zod)',
        })
    })
});
const updateBuildings = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is Required (zod)',
        }).optional()
    })
});
exports.BuildingsValidation = { createBuildings, updateBuildings };
