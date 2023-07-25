const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true, minLength: 5 },
  dateAdded: { type: Date, required: true },
  lastUpdated: { type: Date, required: true },
});

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
