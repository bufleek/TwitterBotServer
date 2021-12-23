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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var db_1 = require("./db");
var api_response_1 = require("./api_response");
'./api_response';
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app
    .route("/api/reply")
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var replies, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.pool.query("SELECT * FROM replies")];
            case 1:
                replies = _a.sent();
                res.json(new api_response_1.ApiResponse("ok", "Records retrieved successfully", replies.rows));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_1.message, null));
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, reply, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                text = req.body.text;
                if (text == null || text == undefined) {
                    res.status(400);
                    res.json(new api_response_1.ApiResponse("error", "Bad Request", null));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.pool.query("INSERT INTO replies (text) VALUES ($1) RETURNING *", [
                        text,
                    ])];
            case 1: return [4 /*yield*/, (_a.sent()).rows[0]];
            case 2:
                reply = _a.sent();
                res.json(new api_response_1.ApiResponse("ok", "Inserted successfully", reply));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_2.message, null));
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })
    .delete(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var replies, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.pool.query("DELETE FROM replies RETURNING *")];
            case 1:
                replies = _a.sent();
                res.json(new api_response_1.ApiResponse("ok", replies.rowCount + " records deleted", null));
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_3.message, null));
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app
    .route("/api/reply/:id")
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, reply, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (id == null || id == undefined) {
                    res.status(400);
                    res.json(new api_response_1.ApiResponse("error", "Bad Request", null));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.pool.query("SELECT * FROM replies WHERE id = $1", [
                        id,
                    ])];
            case 1:
                reply = _a.sent();
                res.json(new api_response_1.ApiResponse("ok", "Record retrieved successfully", reply));
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_4.message, null));
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .put(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, text, reply, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                text = req.body.text;
                if (id == null || id == undefined || text == null || text == undefined) {
                    res.status(400);
                    res.json(new api_response_1.ApiResponse("error", "Bad Request", null));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.pool.query("UPDATE replies SET text = $1 WHERE id = $2", [text, id])];
            case 1:
                reply = _a.sent();
                res.json(new api_response_1.ApiResponse("ok", "Record updated successfully", reply));
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_5.message, null));
                console.log(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .delete(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, reply, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (id == null || id == undefined) {
                    res.status(400);
                    res.json({ message: "Bad Request" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.pool.query("DELETE FROM replies WHERE id = $1 RETURNING *", [id])];
            case 1:
                reply = _a.sent();
                res.json({ message: reply.rows[0] });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_6.message, null));
                console.log(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app
    .route("/api/account")
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accounts, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.pool.query("SELECT * FROM accounts")];
            case 1:
                accounts = _a.sent();
                res.json(new api_response_1.ApiResponse("ok", "", accounts.rows));
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_7.message, null));
                console.log(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, account, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.body.username;
                password = req.body.password;
                if (username == null ||
                    username == undefined ||
                    password == null ||
                    password == undefined) {
                    res.status(400);
                    res.json(new api_response_1.ApiResponse("error", "Bad Request", null));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, db_1.pool.query("INSERT INTO accounts (username, password) VALUES ($1, $2) RETURNING *", [username, password])];
            case 1:
                account = _a.sent();
                res.json(new api_response_1.ApiResponse("ok", "", account.rows[0]));
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_8.message, null));
                console.log(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .delete(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accounts, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.pool.query("DELETE FROM accounts RETURNING *")];
            case 1:
                accounts = _a.sent();
                res.json(new api_response_1.ApiResponse("ok", accounts.rowCount + " Records deleted", null));
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_9.message, null));
                console.log(error_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.route("/api/account/:id")
    .put(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, username, password, accounts, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                username = req.body.username;
                password = req.body.password;
                return [4 /*yield*/, db_1.pool.query("UPDATE accounts SET username = $1, password = $2 WHERE id = $3", [username, password, id])];
            case 1:
                accounts = _a.sent();
                res.json(new api_response_1.ApiResponse("ok", "Record updated successfully", accounts.rows[0]));
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_10.message, null));
                console.log(error_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .delete(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, accounts, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, db_1.pool.query("DELETE FROM accounts WHERE id = $1", [id])];
            case 1:
                accounts = _a.sent();
                res.json(new api_response_1.ApiResponse("ok", accounts.rowCount + " Records deleted", null));
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                res.status(500);
                res.json(new api_response_1.ApiResponse("error", error_11.message, null));
                console.log(error_11);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(8080, function () { return console.log("http://localhost:8080"); });
