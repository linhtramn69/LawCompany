const { ObjectId } = require("mongodb");

class Fee {
    constructor(client){
        this.Fee = client.db().collection("fee");
    }

    // define csdl
    extractConactData(payload){
        const fee = {
            mo_ta: payload.mo_ta,
            don_gia: payload.don_gia,
            so_hoa_don: payload.so_hoa_don,
            hinh_anh: payload.hinh_anh,
            ngay_lap: payload.ngay_lap,
            vu_viec: payload.vu_viec,
            nhan_vien: payload.nhan_vien,
            khach_hang: payload.khach_hang,
            status: payload.status,
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