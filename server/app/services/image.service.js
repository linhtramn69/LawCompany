const { ObjectId } = require("mongodb");

class Image {
    constructor(client){
        this.Image = client.db().collection("image");
    }

    // define csdl
    extractConactData(payload){
        const image = {
            ten_image: payload.ten_image,
            link_image: payload.link_image,
            id_tai_lieu: payload.id_tai_lieu
        };

        // remove undefined fields
        Object.keys(image).forEach(
            (key) => image[key] === undefined && delete image[key]
        );
        return image;
    }

    async findAll(){
        const result = await this.Image.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Image.findOne(id);
        return result;
    }

    async create(payload){
        const image = this.extractConactData(payload);
        const result = await this.Image.insertOne(image);
        return result;
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const image = this.extractConactData(payload);
        const result = await this.Image.findOneAndUpdate(
            id,
            { $set: image },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Image.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = Image;