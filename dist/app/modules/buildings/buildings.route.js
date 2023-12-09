"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingsRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const buildings_controller_1 = require("./buildings.controller");
const buildings_validation_1 = require("./buildings.validation");
const router = (0, express_1.Router)();
router.get('/', buildings_controller_1.BuildingsController.getAllDb);
router.post('/', 
// auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.SUPER_ADMIN),
(0, validateRequest_1.default)(buildings_validation_1.BuildingsValidation.createBuildings), buildings_controller_1.BuildingsController.insertDB);
router.get('/:id', buildings_controller_1.BuildingsController.getSingleDataById);
router.put('/:id', buildings_controller_1.BuildingsController.updateIntoDb);
router.delete('/:id', buildings_controller_1.BuildingsController.updateIntoDb);
exports.buildingsRoutes = router;
