import API from './api.service'

class MatterService {
    async get(){
        return (await API.get(`/matter`));
    }
    async getById(id){
        return (await API.get(`/matter/${id}`));
    }
    async create(data){
        return (await API.post(`matter`, data));
    }
    async update(id, data){
        return (await API.put(`matter/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`matter/${id}`));
    }
}

let matterService = new MatterService();
export default matterService;