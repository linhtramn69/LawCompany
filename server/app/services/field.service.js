const { ObjectId } = require("mongodb");

class Field {
    constructor(client){
        this.Field = client.db().collection("field");
    }

    // define csdl
    extractConactData(payload){
        const field = {
            _id: payload._id,
            ten_linh_vuc: payload.ten_linh_vuc,
            mo_ta_linh_vuc: payload.mo_ta_linh_vuc,
            hinh_anh_linh_vuc: payload.hinh_anh_linh_vuc,
            status: payload.status
        };

        // remove undefined fields
        Object.keys(field).forEach(
            (key) => field[key] === undefined && delete field[key]
        );
        return field;
    }

    async findAll(){
        const result = await this.Field.find();
        return result.toArray();
    }

    async findById(id){
        const result = await this.Field.findOne({ _id: id });
        return result;
    }

    async findByName(name){
        const result = await this.Field.findOne({ ten_loai_dv: name});
        return result;
    }

    async create(payload){
        const field = this.extractConactData(payload);
        const result = await this.Field.insertOne(field);
        return result;
    }

    async update(id, payload){
        const field = this.extractConactData(payload);
        const result = await this.Field.findOneAndUpdate(
            { _id: id },
            { $set: field },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        const result = await this.Field.findOneAndDelete({ _id: id});
        return result.value;
    }

}

module.exports = Field;