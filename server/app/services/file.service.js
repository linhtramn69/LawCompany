const { ObjectId } = require("mongodb");

class File {
    constructor(client){
        this.File = client.db().collection("file");
    }

    // define csdl
    extractConactData(payload){
        const file = {
            ngay_lap_hs: payload.ngay_lap_hs,
            id_hop_dong: payload.id_hop_dong,
            giai_doan: payload.giai_doan
        };

        Object.keys(file).forEach(
            (key) => file[key] === undefined && delete file[key]
        );
        return file;
    }

    async findAll(){
        const result = await this.File.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.File.findOne(id);
        return result;
    }

    async create(payload){
        const file = this.extractConactData(payload);
        const result = await this.File.insertOne(file);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const file = this.extractConactData(payload);
        const result = await this.File.findOneAndUpdate(
            id,
            { $set: file },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.File.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = File;