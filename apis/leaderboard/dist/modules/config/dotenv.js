"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootPath = void 0;
const node_path_1 = require("node:path");
const monorepo_root_1 = require("monorepo-root");
exports.rootPath = (0, monorepo_root_1.monorepoRootSync)();
process.loadEnvFile((0, node_path_1.join)(exports.rootPath, ".env"));
//# sourceMappingURL=dotenv.js.map