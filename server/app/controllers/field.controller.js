const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Field = require("../services/field.service");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const field = new Field(MongoDB.client);
        documents = await field.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all fields")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const field = new Field(MongoDB.client);
        const document = await field.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find one field by id")
        );
    }
};

exports.findByName = async (req, res, next) => {
    try{
        const field = new Field(MongoDB.client);
        const document = await field.findByName(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find one field by name")
        );
    }
}

exports.create = async (req, res, next) => {
    try{
        const field = new Field(MongoDB.client);
        const document = await field.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating the field")
        );
    }
};

exports.update = async (req, res, next) => {
    try{
        const field = new Field(MongoDB.client);
        const document = await field.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update field")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const field = new Field(MongoDB.client);
        const document = await field.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete field")
        );
    }
}

