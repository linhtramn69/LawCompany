const { ObjectId } = require("mongodb");

class User {
    constructor(client) {
        this.User = client.db().collection("user");
    }

    extractConactData(payload) {
        const user = {
            ho_ten: payload.ho_ten,
            email: payload.email,
            ngay_sinh: payload.ngay_sinh,
            nghe_nghiep: payload.nghe_nghiep,
            dia_chi: payload.dia_chi,
            avatar: payload.avatar,
            loai_user: payload.loai_user,
            website_cong_ty: payload.website_cong_ty,
            account: {
                mat_khau: payload.account.mat_khau,
                sdt: payload.account.sdt,
                quyen: payload.account.quyen
            },
            bo_phan: payload.bo_phan,
            chuc_vu: payload.chuc_vu,
            linh_vuc: payload.linh_vuc,
            bang_cap: payload.bang_cap,
            active: payload.active,
        };

        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async findAll() {
        const result = await this.User.find();
        return result.toArray();
    }

    async findById(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.User.findOne(id);
        return result;
    }

    // tim tat ca nhan vien theo bo phan
    async findAllByBoPhan(id_bo_phan) {
        const result = await this.User.find({ "bo_phan.id": id_bo_phan });
        return result.toArray();
    }
    async findByMatter(array) {
        const oids = [];
        array.forEach(function (item) {
            oids.push(new ObjectId(item));
        });
        const result = await this.User.find({ _id: {$in : oids}});
        return result.toArray();
    }
    async create(payload) {
        const user = this.extractConactData(payload);
        const isExist = await this.User.findOne({ "account.sdt": user.account.sdt })
        if (!isExist) {
            const result = await this.User.insertOne(user);
            return result;
        }
        return Error;
    }

    async update(id, payload) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const user = this.extractConactData(payload);
        const result = await this.User.findOneAndUpdate(
            id,
            { $set: user },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.User.findOneAndDelete(id);
        return result;
    }

    async login(payload) {
        const result = await this.User.findOne({
            "account.sdt": payload.sdt,
            "account.mat_khau": payload.mat_khau
        })
        return result;
    }

}

module.exports = User;