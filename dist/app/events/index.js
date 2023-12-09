"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_event_1 = __importDefault(require("../modules/Students/student.event"));
const subscribeToEvents = () => {
    (0, student_event_1.default)();
};
exports.default = subscribeToEvents;
