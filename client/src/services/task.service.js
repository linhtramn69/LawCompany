import API from './api.service'

class TaskService {
    async get(){
        return (await API.get(`/task`));
    }
    async getById(id){
        return (await API.get(`/task/${id}`));
    }
    async findByMatter(data) {
        return (await API.post(`/task/findByMatter`, data));
    }
    async getByStaff(id){
        return (await API.post(`task/findByStaff`, id))
    }
    async getByStatus(status){
        return (await API.post(`matter/findByStatus`, status))
    }
    async create(data){
        return (await API.post(`task`, data));
    }
    async update(id, data){
        return (await API.put(`task/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`task/${id}`));
    }
}

let taskService = new TaskService();
export default taskService;