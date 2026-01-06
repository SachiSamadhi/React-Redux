import axios from "axios";

const API_BASE_URL = "/api"; // Update with your backend base URL if different

class CommonService {
  // ---------------- Banner Images ----------------
  static async getBannerImages() {
    try {
      const response = await axios.get(`${API_BASE_URL}/common/banners`);
      // Expected backend response: { status: 200, data: { ResultSet: [...] } }
      return response;
    } catch (error) {
      // Let the action handle error dispatch
      throw error;
    }
  }

  // ---------------- Header / Menu Components ----------------
  static async GetAccessHeadComponent() {
    try {
      const response = await axios.get(`${API_BASE_URL}/common/header-access`);
      // Expected backend response: { status: 200, data: { ResultSet: [...] } }
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default CommonService;
