const { ObjectId } = require("mongodb");

class Customer {
    constructor(client){
        this.Customer = client.db().collection("customer");
    }

    extractConactData(payload){
        const customer = {
            _id: payload.account.sdt,
            ho_ten: payload.ho_ten,
            email: payload.email,
            ngay_sinh: payload.ngay_sinh,
            nghe_nghiep: payload.nghe_nghiep,
            dia_chi: payload.dia_chi,
            avatar: payload.avatar,
            loai_customer: payload.loai_customer,
            account: {
                mat_khau: payload.account.mat_khau,
                sdt: payload.account.sdt,
                quyen: 0
            }
        };

        Object.keys(customer).forEach(
            (key) => customer[key] === undefined && delete customer[key]
        );
        return customer;
    }

    async findAll(){
        const result = await this.Customer.find();
        return result.toArray();
    }

    async findById(id){
        const result = await this.Customer.findOne({ _id: id });
        return result;
    }

    async create(payload){
        const customer = this.extractConactData(payload);
        const result = await this.Customer.insertOne(customer);
        return result;
    }

    async update(id, payload){
        const customer = this.extractConactData(payload);
        const result = await this.Customer.findOneAndUpdate(
            { _id: id },
            { $set: customer },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        const result = await this.Customer.findOneAndDelete({ _id: id });
        return result;
    }

    async login(payload){
        const result = await this.Customer.findOne({
            "account.sdt": payload.sdt,
            "account.mat_khau": payload.mat_khau
        })
        return result;
    }

}

module.exports = Customer;