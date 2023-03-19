const { ObjectId } = require("mongodb");

class RegiterForm {
    constructor(client){
        this.RegiterForm = client.db().collection("registerForm");
    }

    // define csdl
    extractConactData(payload){
        const registerForm = {
            ngay_lap_phieu: payload.ngay_lap_phieu,
            trang_thai_phieu: payload.trang_thai_phieu,
            lich_hen: payload.lich_hen,
            dich_vu: payload.dich_vu,
            khach_hang: payload.khach_hang,
            luat_su: payload.luat_su
        };

        Object.keys(registerForm).forEach(
            (key) => registerForm[key] === undefined && delete registerForm[key]
        );
        return registerForm;
    }

    async findAll(){
        const result = await this.RegiterForm.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.RegiterForm.findOne(id);
        return result;
    }

    async create(payload){
        const registerForm = this.extractConactData(payload);
        const result = await this.RegiterForm.insertOne(registerForm);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const registerForm = this.extractConactData(payload);
        const result = await this.RegiterForm.findOneAndUpdate(
            id,
            { $set: registerForm },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.RegiterForm.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = RegiterForm;