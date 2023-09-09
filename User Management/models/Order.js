const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: String,
    userId: String,
    amount: Number,
    status: String,
    txnId: String,
    items: [
        {
            productId: {type: Schema.Types.ObjectId, ref: 'product', require: true},
            unit: {type: Number, require: true}
        }
    ]
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamp: true
});

module.exports = mongoose.model('order', OrderSchema);