"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../database/categoryModel"));
class CategoryRepo {
    async saveCategory(name) {
        try {
            let saveCategory = await categoryModel_1.default.create({
                name: name,
            });
            return saveCategory;
        }
        catch (error) {
            throw error;
        }
    }
    async fetchCategory() {
        try {
            let category = categoryModel_1.default.find();
            return category;
        }
        catch (error) {
            throw error;
        }
    }
    async findCategory(name) {
        try {
            const categoryFound = await categoryModel_1.default.findOne({
                name: { $regex: `^${name}$`, $options: "i" },
            });
            if (categoryFound) {
                return categoryFound;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async actionCategory(id) {
        try {
            let blocked = await categoryModel_1.default.findOne({ _id: id });
            if (blocked?.is_blocked) {
                await categoryModel_1.default.findOneAndUpdate({ _id: id }, {
                    is_blocked: false,
                });
                return false;
            }
            else {
                await categoryModel_1.default.findOneAndUpdate({ _id: id }, {
                    is_blocked: true,
                });
                return true;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async updateCategory(catId, cat) {
        try {
            const categoryFound = await categoryModel_1.default.findOne({
                name: { $regex: `^${cat}$`, $options: "i" },
            });
            if (categoryFound) {
                return false;
            }
            else {
                await categoryModel_1.default.findOneAndUpdate({ _id: catId }, {
                    name: cat,
                }, { new: true });
                return true;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getSpecific_category(id) {
        try {
            const category = await categoryModel_1.default.findOne({ _id: id });
            if (category) {
                return category;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = CategoryRepo;
