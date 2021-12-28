import api from "./api";

class EventService {
	getEvent() {
		return api.get("/event/own");
	}
}

export default new EventService();
