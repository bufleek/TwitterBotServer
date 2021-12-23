"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiResponse = /** @class */ (function () {
    function ApiResponse(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
