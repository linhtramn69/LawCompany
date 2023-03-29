const { ObjectId } = require("mongodb");

class QuoteForm {
    constructor(client){
        this.QuoteForm = client.db().collection("quoteForm");
    }

    // define csdl
    extractConactData(payload){
        const quoteForm = {
            khach_hang: payload.khach_hang,
            linh_vuc: payload.linh_vuc,
            dich_vu: payload.dich_vu,
            nguoi_lap_phieu: payload.nguoi_lap_phieu,
            ngay_gui_phieu: payload.ngay_gui_phieu,
            ngay_lap_phieu: payload.ngay_lap_phieu,
            ngay_xac_nhan_phieu: payload.ngay_xac_nhan_phieu,
            trang_thai_phieu: payload.trang_thai_phieu,
            tong_gia_du_kien: payload.tong_gia_du_kien,
            dieu_khoan_thanh_toan: payload.dieu_khoan_thanh_toan,
            van_de: payload.van_de,
            ghi_chu: payload.ghi_chu,
            status: payload.status
        };

        Object.keys(quoteForm).forEach(
            (key) => quoteForm[key] === undefined && delete quoteForm[key]
        );
        return quoteForm;
    }

    async findAll(){
        const result = await this.QuoteForm.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.QuoteForm.findOne(id);
        return result;
    }

    async create(payload){
        const quoteForm = this.extractConactData(payload);
        const result = await this.QuoteForm.insertOne(quoteForm);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const quoteForm = this.extractConactData(payload);
        const result = await this.QuoteForm.findOneAndUpdate(
            id,
            { $set: quoteForm },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.QuoteForm.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = QuoteForm;