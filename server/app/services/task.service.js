const { ObjectId } = require("mongodb");

class Task {
    constructor(client){
        this.Task = client.db().collection("task");
        this.User = client.db().collection("user");
    }

    // define csdl
    extractConactData(payload){
        const task = {
            ten_cong_viec: payload.ten_cong_viec,
            nguoi_phu_trach: payload.nguoi_phu_trach,
            vu_viec: payload.vu_viec,
            han_chot_cong_viec: payload.han_chot_cong_viec,
            ngay_giao: payload.ngay_giao,
            status: payload.status
        };

        Object.keys(task).forEach(
            (key) => task[key] === undefined && delete task[key]
        );
        return task;
    }

    async findAll(){
        const result = await this.Task.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Task.findOne(id);
        return result;
    }

    async findByMatter(payload){
        const result = await this.Task.find({
            vu_viec :  payload.id
        });
        return result.toArray();
    }

    //lay cong viec theo nvien
    async findByStaff(payload){
        const result = await this.Task.find({
            "nguoi_phu_trach._id":  new ObjectId(payload.id) 
        });
        return result.toArray();
    }

    // lay cong viec theo trang thai
    async findByStatus(statusP) {
        const result = await this.Task.find({ status: Number(statusP) });
        return result.toArray();
    }

    async create(payload){
        const task = this.extractConactData(payload);
        const newVal = {
            ...task,
            nguoi_phu_trach: await this.User.findOne({ _id: new ObjectId(payload.nguoi_phu_trach) })
        }
        const result = await this.Task.insertOne(newVal);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const task = this.extractConactData(payload);
        const newVal = {
            ...task,
            nguoi_phu_trach: await this.User.findOne({ _id: new ObjectId(payload.nguoi_phu_trach) })
        }
        const result = await this.Task.findOneAndUpdate(
            id,
            { $set: newVal },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Task.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = Task;