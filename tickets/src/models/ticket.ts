import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new User
interface TicketAttrs {
   title: string,
   price: number,
   userId: string
}

// interface that describes properties that a ticket model has
interface TicketModel extends mongoose.Model<TicketDoc> {
   build(attrs: TicketAttrs): TicketDoc;
}

// interface that describes the properties that a ticket document has
interface TicketDoc extends mongoose.Document{
    title: string,
    price: number,
    userId: string
    updatedAt: string;
    createdAt: string; 
}

const ticketSchema = new mongoose.Schema({
   title: {
      type: String, // String is capital, it's a mongoose thing not TS thingy
      required: true
   },
   price: {
      type: Number, // Number is capital, it's a mongoose thing not TS thingy
      required: true
    },
    userId: {
        type: String, // String is capital, it's a mongoose thing not TS thingy
        required: true
    }
   },
   {
      toJSON: {
         transform(doc, ret){
            ret.id = ret.__id;
            //delete ret.__id;
         }
      }
   }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
   return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('User', ticketSchema);

export { Ticket };