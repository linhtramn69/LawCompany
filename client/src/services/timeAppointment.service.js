import API from './api.service'

class TimeAppointmentService {
    async get(){
        return (await API.get(`/time-appointment`));
    }
    async getById(id){
        return (await API.get(`/time-appointment/${id}`));
    }
    async create(data){
        return (await API.post(`time-appointment`, data));
    }
    async update(id, data){
        return (await API.put(`time-appointment/${id}`, data));
    }
    async delete(id){
        return (await API.delete(`time-appointment/${id}`));
    }
}

let timeAppointmentService = new TimeAppointmentService();
export default timeAppointmentService;