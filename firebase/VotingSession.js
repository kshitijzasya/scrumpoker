import firebase from './clientApp';

const TABLE = 'voting';
const database = firebase.firestore();
const collection = database.collection(TABLE);

export default function() {
    return {
        get: function() {
            return collection;
        },
        add: function(point) {
            return new Promise(function(resolve, reject) {
                collection.doc().set({
                    name:'test',
                    value: point
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