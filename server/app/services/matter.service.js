const { ObjectId } = require("mongodb");

class Matter {
    constructor(client){
        this.Matter = client.db().collection("matter");
        
    }

    // define csdl
    extractConactData(payload){
        const matter = {
            ten_vu_viec: payload.ten_vu_viec,
            dieu_khoan_thanh_toan: payload.dieu_khoan_thanh_toan,
            phuong_thuc_tinh_phi: payload.phuong_thuc_tinh_phi,
            chiet_khau_hoa_hong: payload.chiet_khau_hoa_hong,
            mo_ta_vu_viec: payload.mo_ta_vu_viec,
            linh_vuc: payload.linh_vuc,
            dich_vu: payload.dich_vu,
            luat_su: payload.luat_su,
            khach_hang: payload.khach_hang,
            truy_cap: payload.truy_cap,
            quy_trinh: payload.quy_trinh,
            tai_lieu: payload.tai_lieu,
            chi_phi: payload.chi_phi,
            lien_he: payload.lien_he,
            status: payload.status
        };

        Object.keys(matter).forEach(
            (key) => matter[key] === undefined && delete matter[key]
        );
        return matter;
    }

    async findAll(){
        const result = await this.Matter.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Matter.findOne(id);
        return result;
    }


    // lay vu viec theo trang thai
    async findByStatus(statusP){
        const result = await this.Matter.find({status: Number (statusP)});
        return result.toArray();
    }

    async create(payload){
        const matter = this.extractConactData(payload);
        const result = await this.Matter.insertOne(matter);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const matter = this.extractConactData(payload);
        const result = await this.Matter.findOneAndUpdate(
            id,
            { $set: matter },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Matter.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = Matter;