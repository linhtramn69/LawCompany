const { ObjectId } = require("mongodb");

class Bill {
    constructor(client) {
        this.Bill = client.db().collection("bill");
        this.User = client.db().collection("user");
        this.Matter = client.db().collection("matter");
    }

    // define csdl
    extractConactData(payload) {
        const bill = {
            ngay_lap: payload.ngay_lap,
            nhan_vien_lap_hoa_don: payload.nhan_vien_lap_hoa_don,
            loai_hoa_don: payload.loai_hoa_don,
            vu_viec: payload.vu_viec,
            chi_phi_phat_sinh: payload.chi_phi_phat_sinh,
            tong_gia_tri: payload.tong_gia_tri,
            status: payload.status,
            ghi_chu: payload.ghi_chu,
            tai_khoan_cong_ty: payload.tai_khoan_cong_ty,
            tai_khoan_khach: payload.tai_khoan_khach,
        };

        // remove undefined fields
        Object.keys(bill).forEach(
            (key) => bill[key] === undefined && delete bill[key]
        );
        return bill;
    }

    async findAll() {
        const result = await this.Bill.find();
        return result.toArray();
    }
    async findByMatter(payload) {
        const result = await this.Bill.find({
            vu_viec: { $eq: payload.id }
        });
        return result.toArray();
    }
    async findById(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Bill.findOne(id);
        return result;
    }

    async create(payload) {
        const bill = this.extractConactData(payload);
        const newVal = {
            ...bill,
            nhan_vien_lap_hoa_don: await this.User.findOne({ _id: new ObjectId(payload.nhan_vien_lap_hoa_don) })
        }
        // const result = await this.Bill.insertOne(newVal);
        this.updateToTalMatter(payload.vu_viec)
        return newVal;
    }
    updateToTalMatter(payload) {
        let total = 0;
        const result = this.Bill.find({ vu_viec: payload })
        result.forEach((value) => {
            total = total + value.tong_gia_tri
        }).then(()=> {
            console.log(total);
            return total;
        })
    }

    async update(id, payload) {
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

    async delete(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Bill.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = Bill;