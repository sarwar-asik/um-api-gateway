"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const rooms_controller_1 = require("./rooms.controller");
const rooms_validation_1 = require("./rooms.validation");
const router = (0, express_1.Router)();
router.get('/', rooms_controller_1.RoomsController.getAllDb);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(rooms_validation_1.RoomsValidation.createRooms), rooms_controller_1.RoomsController.insertDB);
router.get('/:id', rooms_controller_1.RoomsController.getSingleDataById);
router.put('/:id', rooms_controller_1.RoomsController.updateIntoDb);
router.delete('/:id', rooms_controller_1.RoomsController.updateIntoDb);
exports.roomsRoutes = router;
