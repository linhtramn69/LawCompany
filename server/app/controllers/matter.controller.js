const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Matter = require("../services/matter.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const matter = new Matter(MongoDB.client);
        documents = await matter.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all matters")
        );
    }
}

exports.findByStatus = async (req, res, next) => {
    try{
        const matter = new Matter(MongoDB.client);
        const document = await matter.findByStatus(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find matter by status")
        );
    }
}

exports.findByIdAccess = async (req, res, next) => {
    try{
        const matter = new Matter(MongoDB.client);
        const document = await matter.findByIdAccess(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find matter by status")
        );
    }
}
exports.findById = async (req, res, next) => {
    try{
        const matter = new Matter(MongoDB.client);
        const document = await matter.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find matter by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const matter = new Matter(MongoDB.client);
        const document = await matter.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating matter")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const matter = new Matter(MongoDB.client);
        const document = await matter.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update matter")
        );
    }
}
exports.setStatus = async (req, res, next) => {
    try{
        const matter = new Matter(MongoDB.client);
        const document = await matter.setStatus(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update matter")
        );
    }
}
exports.setStatusTT = async (req, res, next) => {
    try{
        const matter = new Matter(MongoDB.client);
        const document = await matter.setStatus_TT(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update matter")
        );
    }
}
exports.delete = async (req, res, next) => {
    try{
        const matter = new Matter(MongoDB.client);
        const document = await matter.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete matter")
        );
    }
}
exports.findFinishedByIdAndYear = async (req, res, next) => {
    let arrs = [];
    try {
        const matter = new Matter(MongoDB.client);
        for(let i=1; i<=12; i++){
            let total = 0;
            const documents = await matter.findFinishedByIdAndYear(req.body, i);
            documents.forEach(element => {
                total ++;
            })
            documents.length > 0 ? arrs.push(total) : arrs.push(0)
        }
        return res.send(arrs);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occured while find finish matter by year ")
        );
    }
};