const { ObjectId } = require("mongodb");

class QuoteForm {
    constructor(client){
        this.QuoteForm = client.db().collection("quoteForm");
    }

    // define csdl
    extractConactData(payload){
        const quoteForm = {
            ngay_lap_phieu: payload.ngay_lap_phieu,
            trang_thai_phieu: payload.trang_thai_phieu,
            lich: payload.lich,
            khach_hang: payload.khach_hang,
            luat_su: payload.luat_su,
            dich_vu: payload.dich_vu,
            hop_dong: payload.hop_dong,
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