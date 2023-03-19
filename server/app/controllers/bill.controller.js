const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Bill = require("../services/bill.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const bill = new Bill(MongoDB.client);
        documents = await bill.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all bills")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const bill = new Bill(MongoDB.client);
        const document = await bill.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find bill by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const bill = new Bill(MongoDB.client);
        const document = await bill.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating bill")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const bill = new Bill(MongoDB.client);
        const document = await bill.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update bill")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const bill = new Bill(MongoDB.client);
        const document = await bill.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete bill")
        );
    }
}