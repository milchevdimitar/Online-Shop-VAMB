import mongoose from 'mongoose';

const secretSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  key: { type: mongoose.Schema.Types.Mixed, required: true },
  lastEdited: { type: Date, default: Date.now }
});

const SecretModel = mongoose.model("Secret", secretSchema);

export default SecretModel;
