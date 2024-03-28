import firebase from '../config/firebase';

export const fireRegister = async(data)=>{
    
    const responseUser = await firebase.auth().createUserWithEmailAndPassword(data.email,data.password)

    if(responseUser.user.uid){
        const document = await firebase.firestore().collection("usuarios").add({
            nombre: data.nombre,
            apellido: data.apellido,
            dni: data.dni,
            telefono: data.telefono,
            email:data.email,
            rol: data.rol,
            userId: responseUser.user.uid
        })
        return document
    }
}

export const fireLogin = async (data)=>{
    const responseUser = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);

    if (responseUser.user.uid){
        const document = await firebase.firestore().collection("usuarios")
            .where("userId","==",responseUser.user.uid).get();

        return document.docs[0].data();
    }
    return {};
}