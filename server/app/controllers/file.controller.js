const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const File = require("../services/file.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const file = new File(MongoDB.client);
        documents = await file.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all files")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const file = new File(MongoDB.client);
        const document = await file.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find file by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const file = new File(MongoDB.client);
        const document = await file.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating file")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const file = new File(MongoDB.client);
        const document = await file.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update file")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const file = new File(MongoDB.client);
        const document = await file.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete file")
        );
    }
}