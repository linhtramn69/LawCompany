const { ObjectId } = require("mongodb");

class Bill {
    constructor(client){
        this.Bill = client.db().collection("bill");
    }

    // define csdl
    extractConactData(payload){
        const bill = {
            ngay_lap_hoa_don: payload.ngay_lap_hoa_don,
            tong_gia_tri: payload.tong_gia_tri,
            trang_thai_hoa_don: payload.trang_thai_hoa_don,
            id_hop_dong: payload.id_hop_dong,
            id_hinh_thuc_thanh_toan: payload.id_hinh_thuc_thanh_toan
        };

        // remove undefined fields
        Object.keys(bill).forEach(
            (key) => bill[key] === undefined && delete bill[key]
        );
        return bill;
    }

    async findAll(){
        const result = await this.Bill.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Bill.findOne(id);
        return result;
    }

    async create(payload){
        const bill = this.extractConactData(payload);
        const result = await this.Bill.insertOne(bill);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const bill = this.extractConactData(payload);
        const result = await this.Bill.findOneAndUpdate(
            id,
            { $set: bill },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Bill.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = Bill;