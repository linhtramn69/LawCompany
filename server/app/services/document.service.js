const { ObjectId } = require("mongodb");

class Document {
    constructor(client){
        this.Document = client.db().collection("document");
    }

    // define csdl
    extractConactData(payload){
        const document = {
            ten_tai_lieu: payload.ten_tai_lieu,
            noi_dung: payload.noi_dung,
            hinh_anh: payload.hinh_anh,
            id_giai_doan: payload.id_giai_doan
        };

        // remove undefined fields
        Object.keys(document).forEach(
            (key) => document[key] === undefined && delete document[key]
        );
        return document;
    }

    async findAll(){
        const result = await this.Document.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Document.findOne(id);
        return result;
    }

    async create(payload){
        const document = this.extractConactData(payload);
        const result = await this.Document.insertOne(document);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const document = this.extractConactData(payload);
        const result = await this.Document.findOneAndUpdate(
            id,
            { $set: document },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Document.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = Document;