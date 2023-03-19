const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const RegisterForm = require("../services/registerForm.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const registerForm = new RegisterForm(MongoDB.client);
        documents = await registerForm.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all registerForms")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const registerForm = new RegisterForm(MongoDB.client);
        const document = await registerForm.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find registerForm by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const registerForm = new RegisterForm(MongoDB.client);
        const document = await registerForm.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating registerForm")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const registerForm = new RegisterForm(MongoDB.client);
        const document = await registerForm.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update registerForm")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const registerForm = new RegisterForm(MongoDB.client);
        const document = await registerForm.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete registerForm")
        );
    }
}