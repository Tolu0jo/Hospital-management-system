"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controller/doctorController");
const auth_1 = require("../middlewares/auth");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.post('/register', multer_1.upload.single("image"), doctorController_1.register);
router.post("/login", doctorController_1.Login);
router.get("/logout", doctorController_1.logOut);
router.post("/editDoctor", auth_1.auth, multer_1.upload.single("image"), doctorController_1.updateDoctor);
exports.default = router;
