import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class Recipe extends Document {
  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  description: string;

  @Prop(raw([{
    'name': {
      type: String,
      required: true,
      trim: true,
    },
    'quantity': {
      type: Number,
      required: true,
    },
    'unit': {
      type: String,
      required: true,
    },
  }]))
  ingredients: any[];

  @Prop({
    type: Array,
    required: true,
    trim: true,
  })
  steps: string[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
