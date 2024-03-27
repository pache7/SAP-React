//avatarServices.js 

import axios from "axios";

export const fetchAvatar = async () => {
    try {
      const response = await axios.get('https://ui-avatars.com/api/?name=Jon+Snow&background=0D8ABC&color=fff&size=128');
      
      const avatarUrl = response.data.avatar_url;
      return {
         avatarUrl
      }
    } catch (error) {
      console.error('Error al obtener el avatar:', error);
    }
  };
