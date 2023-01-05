import firebase from './clientApp';

const TABLE = 'session';
const database = firebase.firestore();
const collection = database.collection(TABLE);

export default function Session() {
    return {
        get: function() {
            return collection;
        },
        add: function(token) {
            return new Promise(function(resolve, reject) {
                collection.doc().set({
                    value: token
                })
                .then(res => resolve(true))
                .catch(err => reject(err)) 
            });
        },
        update: function() {
    
        },
        delete: function() {
    
        }
    }
};