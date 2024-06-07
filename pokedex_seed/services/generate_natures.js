"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const natures_1 = require("../data/natures");
const node_fs_1 = __importDefault(require("node:fs"));
exports.default = () => {
    const valuesText = natures_1.natures.map((nature) => {
        const name = nature.name;
        const increase = nature.increase ? `'${nature.increase}'` : 'NULL';
        const decrease = nature.decrease ? `'${nature.decrease}'` : 'NULL';
        return `('${name}', ${increase}, ${decrease})`;
    }).join(',\n');
    const query = `INSERT INTO natures (name, increase, decrease)\nVALUES\n${valuesText};
    `;
    try {
        node_fs_1.default.writeFileSync('./files/natures.sql', query);
    }
    catch (err) {
        console.error(err);
    }
};
