const { ObjectId } = require("mongodb");

class Fee {
    constructor(client){
        this.Fee = client.db().collection("fee");
    }

    // define csdl
    extractConactData(payload){
        const fee = {
            mo_ta_cpps: payload.mo_ta_cpps,
            don_gia_cpps: payload.don_gia_cpps,
            so_hoa_don_cpps: payload.so_hoa_don_cpps,
            hinh_anh_cpps: payload.hinh_anh_cpps,
            ngay_lap_cpps: payload.ngay_lap_cpps,
            status: payload.status,
            loai_chi_phi_phat_sinh: payload.loai_chi_phi_phat_sinh,
            cong_viec: payload.cong_viec,
        };

        Object.keys(fee).forEach(
            (key) => fee[key] === undefined && delete fee[key]
        );
        return fee;
    }

    async findAll(){
        const result = await this.Fee.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Fee.findOne(id);
        return result;
    }

    async create(payload){
        const fee = this.extractConactData(payload);
        const result = await this.Fee.insertOne(fee);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const fee = this.extractConactData(payload);
        const result = await this.Fee.findOneAndUpdate(
            id,
            { $set: fee },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Fee.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = Fee;