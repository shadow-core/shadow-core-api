import mongoose from 'mongoose';
import { UserSchema } from 'shadow-core-users';


/**
 * Unfortunately we can't use Models themselves and have to create them from schemas. (Hello, mongo!).
 * But this also means that we can extend those schemas and pass to controllers, tests, etc.
 * Shared model just won't work by themselves - we need to provide basic connection to Mongo.
 * Not a best way to share models but we've got what we've got...
 */
export default mongoose.model('User', UserSchema);
