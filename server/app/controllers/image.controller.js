const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Image = require("../services/image.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const image = new Image(MongoDB.client);
        documents = await image.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all images")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const image = new Image(MongoDB.client);
        const document = await image.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find image by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const image = new Image(MongoDB.client);
        const document = await image.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating image")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const image = new Image(MongoDB.client);
        const document = await image.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update image")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const image = new Image(MongoDB.client);
        const document = await image.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete image")
        );
    }
}