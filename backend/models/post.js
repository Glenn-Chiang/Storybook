const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  dateAdded: Date,
  lastUpdated: Date,
});

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Post = mongoose.model('Post', postSchema)

async function main() {
  const url = process.env.MONGODB_URI
  console.log('Connecting to MongoDB...')
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB')
  } catch(error) {
    console.log('Error connecting to MongoDB:', error.message)
  }
}

main()

module.exports = Post