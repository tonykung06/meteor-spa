import { Mongo } from 'meteor/mongo';
 
const ProteinData = new Mongo.Collection('protein_data');

export default ProteinData;