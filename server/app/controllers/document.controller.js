const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Document = require("../services/document.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const docum = new Document(MongoDB.client);
        documents = await docum.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all docums")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const docum = new Document(MongoDB.client);
        const document = await docum.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find docum by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const docum = new Document(MongoDB.client);
        const document = await docum.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating docum")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const docum = new Document(MongoDB.client);
        const document = await docum.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update docum")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const docum = new Document(MongoDB.client);
        const document = await docum.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete docum")
        );
    }
}