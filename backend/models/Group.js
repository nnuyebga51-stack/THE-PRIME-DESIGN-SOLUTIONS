const GroupSchema = new mongoose.Schema({
  name: String,
  open: { type: Boolean, default: true },
  members: [String]
});
