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
const redis_1 = require("../../../shared/redis");
const Students_service_1 = require("./Students.service");
const student_constent_1 = require("./student.constent");
const initStudentEvents = () => {
    redis_1.RedisClient.subscribe(student_constent_1.EVENT_STUDENT_CREATED, (e) => __awaiter(void 0, void 0, void 0, function* () {
        const data = JSON.parse(e);
        console.log(data);
        yield Students_service_1.StudentsService.CreateStudentFromEvent(data);
    }));
};
exports.default = initStudentEvents;
