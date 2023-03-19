const { ObjectId } = require("mongodb");

class Period {
    constructor(client){
        this.Period = client.db().collection("period");
    }

    // define csdl
    extractConactData(payload){
        const period = {
            ten_giai_doan: payload.ten_giai_doan,
            mo_ta_giai_doan: payload.mo_ta_giai_doan,
            id_ho_so: payload.id_ho_so,
            tai_lieu: payload.tai_lieu
        };

        // remove undefined fields
        Object.keys(period).forEach(
            (key) => period[key] === undefined && delete period[key]
        );
        return period;
    }

    async findAll(){
        const result = await this.Period.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Period.findOne(id);
        return result;
    }

    async create(payload){
        const period = this.extractConactData(payload);
        const result = await this.Period.insertOne(period);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const period = this.extractConactData(payload);
        const result = await this.Period.findOneAndUpdate(
            id,
            { $set: period },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Period.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = Period;