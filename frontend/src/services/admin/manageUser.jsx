import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const getAllUsersAPI = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/user/admin/manage_people`);
    // Chuyển đổi dữ liệu nếu cần thiết
    const users = response.data.map(user => ({
      ...user,
      key: user._id,
      avatar: user.avatar,
      userName: user.userName,
      userEmail: user.userEmail,
      userPhone: user.userPhone,
      role: user.role,
      status: user.status,
      create: user.createdAt,
    }));
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export default getAllUsersAPI;