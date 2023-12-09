"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTimeConflict = exports.asyncForEach = void 0;
const asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(array)) {
        throw new Error('Expect an array');
    }
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
exports.asyncForEach = asyncForEach;
const hasTimeConflict = (existingSlots, newSlot) => {
    for (const slot of existingSlots) {
        //   const existingStartTime = new Date(`1970-01-01T${slot.startTime}:00`);
        //   const existingEndTime = new Date(`1970-01-01T${slot.endTime}:00`);
        //   const newStartTime = new Date(`1970-01-01T${newSlot.startTime}:00`);
        //   const newEndTime = new Date(`1970-01-01T${newSlot.endTime}:00`);
        //   console.log('the room not booked','eeeeee',existingSlots,"nnnnnn",newSlot);
        //   if (newStartTime < existingStartTime && newEndTime > existingEndTime) {
        //     // throw new ApiError(httpStatus.CONFLICT, 'The Room already booked  ');
        //     console.log('the room booked');
        //     return true
        //   }
        //   return false
        // }
        const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
        const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
        const newStart = new Date(`1970-01-01T${newSlot.startTime}:00`);
        const newEnd = new Date(`1970-01-01T${newSlot.endTime}:00`);
        if (newStart < existingEnd && newEnd > existingStart) {
            return true;
        }
    }
};
exports.hasTimeConflict = hasTimeConflict;
