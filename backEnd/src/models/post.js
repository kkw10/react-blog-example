import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: { 
    type: String, 
    required: true
  },
  body: { 
    type: String, 
    required: true 
  },
  tags: { 
    type: [String], 
    validate: {
      validator: (v) => {
        return v && v.length > 0;
      },
      message: '1개 이상의 태그를 작성해주세요.'
    }
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  }
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
