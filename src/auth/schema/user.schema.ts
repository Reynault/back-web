import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class User extends Document {
  @Prop({
    type: String,
    required: true,
  })
  username: string;


  @Prop({
    type: String,
    required: true,
  })
  email: string;


  @Prop({
    type: String,
    required: true,
  })
  firstname: string;


  @Prop({
    type: String,
    required: true,
  })
  lastname: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: [mongoose.Types.ObjectId],
  })
  recipes: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
