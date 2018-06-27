import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  name : String,
  band: { type: Schema.Types.ObjectId, ref : 'Band'},
});

export default mongoose.model('Roadie', schema);