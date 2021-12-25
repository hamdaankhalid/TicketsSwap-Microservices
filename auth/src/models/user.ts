import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
   email: string,
   password: string
}

// interface that describes porperties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
   build(attrs: UserAttrs): UserDoc;
}

// interface that describes the properties that a user document has
interface UserDoc extends mongoose.Document{
   email: string;
   password: string;
   updatedAt: string;
   createdAt: string; 
}

const userSchema = new mongoose.Schema({
   email: {
      type: String, // String is capital, it's a mongoose thing not TS thingy
      required: true
   },
   password: {
      type: String, // String is capital, it's a mongoose thing not TS thingy
      required: true
      }
   },
   {
      toJSON: {
         transform(doc, ret){
            ret.id = ret.__id;
            delete ret.__id;
            delete ret.password;
            delete ret.__v;
         }
      }
   }
);

userSchema.pre('save', async function(done){
   if (this.isModified('password')){
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
   }
   done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
   return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };