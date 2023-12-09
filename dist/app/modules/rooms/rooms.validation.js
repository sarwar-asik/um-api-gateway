"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsValidation = void 0;
const zod_1 = require("zod");
const createRooms = zod_1.z.object({
    body: zod_1.z.object({
        roomNumber: zod_1.z.string({
            required_error: 'roomNumber is Required (zod)',
        }),
        floor: zod_1.z.string({
            required_error: 'floor is Required (zod)',
        }),
        buildingId: zod_1.z.string({
            required_error: 'buildingId is Required (zod)',
        }),
    })
});
const updateRooms = zod_1.z.object({
    body: zod_1.z.object({
        roomNumber: zod_1.z.string({
            required_error: 'roomNumber is Required (zod)',
        }).optional(),
        floor: zod_1.z.string({
            required_error: 'floor is Required (zod)',
        }).optional(),
        buildingId: zod_1.z.string({
            required_error: 'buildingId is Required (zod)',
        }).optional(),
    })
});
exports.RoomsValidation = { createRooms, updateRooms };
