"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instructorModel_1 = __importDefault(require("../database/instructorModel"));
class InstructorRepo {
    findInstructorByEmail = async (email) => {
        try {
            let instructorData = await instructorModel_1.default.findOne({ email: email });
            return instructorData ? instructorData.toObject() : null;
        }
        catch (error) {
            throw new Error("unable to fetch instructor data");
        }
    };
    saveInstructorToDatabase = async (instructor) => {
        try {
            let instructorData = new instructorModel_1.default(instructor);
            instructorData.save();
            return instructorData ? instructorData.toObject() : null;
        }
        catch (error) {
            console.log(error);
        }
    };
    async setInstructor(email, password) {
        try {
            const saved = await instructorModel_1.default.findOneAndUpdate({ email: email }, {
                $set: {
                    password: password
                }
            });
            return saved ? saved : null;
        }
        catch (error) {
            throw error;
        }
    }
    async fetchInstructorData(email) {
        try {
            let instructor = await instructorModel_1.default.findOne({ email }, { email: 1, name: 1, about: 1, imageUrl: 1, phone: 1 });
            return instructor;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyInstructor(email) {
        await instructorModel_1.default.findOneAndUpdate({ email: email }, { $set: {
                is_verified: true
            } });
    }
    async saveGoogleAuth(credential) {
        console.log(credential);
        try {
            let saved = await instructorModel_1.default.create({
                name: credential.name,
                email: credential.email,
                is_Verified: true,
                googleId: credential.sub,
                imageUrl: credential.picture,
            });
            return saved;
        }
        catch (error) {
            throw error;
        }
    }
    async findInstructorById(id) {
        try {
            let instructor = await instructorModel_1.default.findById(id);
            if (instructor) {
                return instructor;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async updateProfile(id, instructorData) {
        try {
            const updated = await instructorModel_1.default.findOneAndUpdate({ _id: id }, {
                name: instructorData.name,
                phone: instructorData.phone,
                about: instructorData.about,
            }, { new: true });
            return updated ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async updateImage(id, imageUrl) {
        try {
            const update = await instructorModel_1.default.findOneAndUpdate({ _id: id }, {
                imageUrl: imageUrl,
            }, { new: true });
            if (update) {
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
exports.default = InstructorRepo;
