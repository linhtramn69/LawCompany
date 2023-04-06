const { ObjectId } = require("mongodb");

class Task {
    constructor(client){
        this.Task = client.db().collection("task");
    }

    // define csdl
    extractConactData(payload){
        const task = {
            ten_cong_viec: payload.ten_cong_viec,
            han_chot_cong_viec: payload.han_chot_cong_viec,
            status: payload.status,
            lich: payload.lich,
            giai_doan: payload.giai_doan,
            nguoi_phu_trach: payload.nguoi_phu_trach,
            vu_viec: payload.vu_viec
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

    async create(payload){
        const task = this.extractConactData(payload);
        const result = await this.Task.insertOne(task);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const task = this.extractConactData(payload);
        const result = await this.Task.findOneAndUpdate(
            id,
            { $set: task },
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