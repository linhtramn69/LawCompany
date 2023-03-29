import API from './api.service'

class TimePayService {
    async get(){
        return (await API.get(`/dieu-khoan-thanh-toan`));
    }
    async getById(id){
        return (await API.get(`/dieu-khoan-thanh-toan/${id}`));
    }
    async create(data){
        return (await API.post(`dieu-khoan-thanh-toan`, data));
    }
    async update(id, data){
        return (await API.put(`dieu-khoan-thanh-toan/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`dieu-khoan-thanh-toan/${id}`));
    }
}

let timePayService = new TimePayService();
export default timePayService;