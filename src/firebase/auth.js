import firebase from './config';
import 'firebase/auth';

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            resolve(user);
        }, reject)
    })
}
export default firebase