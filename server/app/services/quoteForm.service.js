const { ObjectId } = require("mongodb");
const nodeMailer = require('nodemailer');

class QuoteForm {
    constructor(client){
        this.QuoteForm = client.db().collection("quoteForm");
        this.TypeService = client.db().collection("typeService");
        this.Service = client.db().collection("service");
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

    // tim cac bao gia theo linh vuc va theo nam
    async findByTypeServiceAndYear(payload, type){
        const rs = await this.QuoteForm.find({
            "linh_vuc._id": type,
            "$expr": {
                "$and": [
                    { "$eq": [{ "$year": "$ngay_lap_phieu" }, payload.year] }
                ]
            }
        })
        return rs.toArray()
    }

    async create(payload){
        const linh_vuc = await this.TypeService.findOne({ _id: payload.linh_vuc });
        const dich_vu = await this.Service.findOne({ _id: new ObjectId(payload.dich_vu) });
        const quote = {
            ...payload,
            linh_vuc: linh_vuc,
            dich_vu: dich_vu,
            ngay_lap_phieu: new Date(payload.ngay_lap_phieu),
        }
        const quoteForm = this.extractConactData(quote);
        const result = await this.QuoteForm.insertOne(quoteForm);
        return result;
    }

    async sendMail(payload){
       
        const adminEmail = 'coopmart.service69@gmail.com';
        const adminPassword = 'zkxomevbzvqlmkdy';
        const mailHost = 'smtp.gmail.com';
        const mailPort = 587;
        const subject = 'Thông tin báo giá'
        const html = `<p>${payload.dich_vu.ten_dv}</p>`

        const transporter = nodeMailer.createTransport({
          host: mailHost,
          port: mailPort,
          secure: false, 
          auth: {
            user: adminEmail,
            pass: adminPassword
          }
        })
        
        const options = {
          from: adminEmail,
          to: payload.khach_hang.email,
          subject: subject,
          html: html
        }
        return transporter.sendMail(options);
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const linh_vuc = await this.TypeService.findOne({ _id: payload.linh_vuc });
        const dich_vu = await this.Service.findOne({ _id: new ObjectId(payload.dich_vu) });
        const quote = {
            ...payload,
            linh_vuc: linh_vuc,
            dich_vu: dich_vu,
        }
        const quoteForm = this.extractConactData(quote);
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