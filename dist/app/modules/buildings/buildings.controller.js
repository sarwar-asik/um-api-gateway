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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingsController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const buildings_service_1 = require("./buildings.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const insertDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield buildings_service_1.BuildingsService.insertDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Successfully Building',
        data: result,
    });
}));
const getAllDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query,'from getAll db controller');
    const filters = (0, pick_1.default)(req.query, [
        'searchTerm',
        'title'
    ]);
    // BuildingFilterableFields (use it in filters )
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    // console.log('filters:::',filters,'options::::',options);
    const result = yield buildings_service_1.BuildingsService.getAllDb(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully get Building Data',
        meta: result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
const getSingleDataById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield buildings_service_1.BuildingsService.getSingleData(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Successfully get ${id}`,
        data: result,
    });
}));
const updateIntoDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req === null || req === void 0 ? void 0 : req.body;
    const result = yield buildings_service_1.BuildingsService.updateItoDb(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Successfully updated ${id}`,
        data: result,
    });
}));
const deleteFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield buildings_service_1.BuildingsService.deleteFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Successfully deleted ${id}`,
        data: result,
    });
}));
exports.BuildingsController = { insertDB, getAllDb, getSingleDataById, deleteFromDb, updateIntoDb };