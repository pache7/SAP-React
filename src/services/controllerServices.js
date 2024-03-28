import firebase from '../config/firebase';


export const getAllUsers = async () => {
    try {
        const snapshot = await firebase.firestore().collection('usuarios').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting all users:', error);
        return [];
    }
};


export const editUser = async (userId, newData) => {
    try {
      const userRef = firebase.firestore().collection('usuarios').doc(userId);
      
      await userRef.update(newData);
  
      return true; 
    } catch (error) {
      console.error('Error editing user:', error);
      return false; 
    }
  };

export const deleteUser = async (userId) => {
    try {
        await firebase.firestore().collection('usuarios').doc(userId).delete();
        return true; 
    } catch (error) {
        console.error('Error deleting user:', error);
        return false; 
    }
};
