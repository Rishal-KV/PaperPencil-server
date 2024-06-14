"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryController {
    category;
    constructor(category) {
        this.category = category;
    }
    async addCategory(req, res) {
        try {
            let { category } = req.body;
            let response = await this.category.addCategory(category);
            if (response?.status) {
                return res.status(200).json(response);
            }
            else {
                return res.status(401).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchCategory(req, res) {
        try {
            let category = await this.category.fetchCategory();
            console.log(category);
            if (category) {
                res.status(200).json(category);
            }
            else {
                res.status(401).json(category);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async actionCategory(req, res) {
        try {
            let { id } = req.body;
            let actionResponse = await this.category.actionCategory(id);
            if (actionResponse) {
                res.status(200).json(actionResponse);
            }
            else {
                res.status(200).json(actionResponse);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateCategory(req, res) {
        try {
            const { id, name } = req.body;
            const response = await this.category.editCategory(id, name);
            if (response?.status) {
                res.status(200).json(response);
            }
            else {
                res.status(401).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async getSpecificCategory(req, res) {
        try {
            const id = req.query.id;
            const response = await this.category.getSpecific_category(id);
            if (response?.status) {
                res.status(200).json(response);
            }
            else {
                res.status(401).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = CategoryController;
