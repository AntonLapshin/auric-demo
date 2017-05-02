"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const path_1 = require("path");
const auric_api_1 = require("./server/auric-api");
let app = express();
/**
 * Get Session Id. Auric API.
 *
 */
app.get('/get_session', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sessionId = yield auric_api_1.default.getSession();
            res.json(sessionId);
        }
        catch (ex) {
            res.status(500).end(ex);
        }
    });
});
app.use(express.static(path_1.join(__dirname, 'public')));
let port = process.env.PORT || 3333;
app.set('port', port);
app.listen(port, function () {
    console.log("app.listen on " + port);
});
//# sourceMappingURL=index.js.map