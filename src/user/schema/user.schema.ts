import { Document } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class User extends Document {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  login: string;

  @Prop({
    type: String,
    trim: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);