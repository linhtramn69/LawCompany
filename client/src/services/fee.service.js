import API from './api.service'

class FeeService {
    async get() {
        return (await API.get(`/fee`));
    }
    async getById(id) {
        return (await API.get(`/fee/${id}`));
    }
    async findByMatter(data) {
        return (await API.post(`/fee/findByMatter`, data));
    }
    async create(data) {
        return (await API.post(`fee`, data));
    }
    async update(id, data) {
        return (await API.put(`fee/${id}`, data));
    }
    async delete(id) {
        return (await API.delete(`fee/${id}`));
    }
}

let feeService = new FeeService();
export default feeService;