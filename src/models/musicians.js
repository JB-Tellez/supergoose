import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  name : String,
  instrument: { type: String, default: 'singer'},
  band: { type: Schema.Types.ObjectId, ref : 'Band'},
});

export default mongoose.model('Musician', schema);