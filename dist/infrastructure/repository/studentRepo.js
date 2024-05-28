"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentModel_1 = __importDefault(require("../database/studentModel"));
class StudentRepo {
    async findStudentByEMail(email) {
        try {
            let studenFound = await studentModel_1.default.findOne({ email: email });
            return studenFound ? studenFound.toObject() : null;
        }
        catch (error) {
            console.log(error.message);
            throw new Error("unable to fetch student data");
        }
    }
    async saveStudentToDatabase(student) {
        try {
            let savedStudent = new studentModel_1.default(student);
            savedStudent.save();
            return savedStudent ? savedStudent.toObject() : null;
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchStudentData(email) {
        try {
            let student = await studentModel_1.default.findOne({ email }, { email: 1, name: 1, profileImage: 1 });
            return student;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyStudent(email) {
        await studentModel_1.default.findOneAndUpdate({ email: email }, {
            is_Verified: true,
        });
    }
    async saveGoogleAuth(credential) {
        try {
            let saved = await studentModel_1.default.create({
                name: credential.name,
                email: credential.email,
                is_Verified: true,
                googleId: credential.sub,
                profileImage: credential.picture,
                about: "",
                number: "",
            });
            return saved;
        }
        catch (error) {
            throw error;
        }
    }
    async updateById(id) {
        try {
            await studentModel_1.default.findOneAndUpdate({ _id: id }, {
                is_Verified: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async setForgotPassword(email, password) {
        try {
            let updated = await studentModel_1.default.findOneAndUpdate({ email: email }, {
                password: password,
            });
            if (updated) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getStudentById(id) {
        try {
            let data = await studentModel_1.default.findOne({ _id: id }).select("-password");
            if (data) {
                return data;
            }
            return null;
        }
        catch (error) {
            throw error;
        }
    }
    async updateProfile(id, data) {
        try {
            let updated = await studentModel_1.default.findOneAndUpdate({ _id: id }, {
                name: data.name,
                number: data.number,
                about: data.about,
                profileImage: data.profileImage,
            }, { new: true });
            if (updated) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async updateImage(id, image) {
        try {
            let updates = await studentModel_1.default.findOneAndUpdate({ _id: id }, {
                profileImage: image.image
            });
            if (updates) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = StudentRepo;
