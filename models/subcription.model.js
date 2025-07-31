import mongoose from 'mongoose';

const subcriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: [3, 'Subscription name must be at least 3 characters long'],
        maxlength: [100, 'Subscription name cannot exceed 100 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'COP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: [true, 'Subscription category is required'],
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => {
                return value <= new Date(); // si el value es menor o igual a la fecha, es basicamente la fecha actual
            },
            message: 'Start date must be in the past or present',
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate; // la fecha de renovacion debe ser mayor a la fecha de inicio
            },
            message: 'Renewal date must be after the start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, // Indexing for faster lookups
    },
}, {
    timestamps: true
});


// aqui usamos pre.save que es un middleware de mongoose que se ejecuta antes de guardar el documento en la base de datos
// modificar campos antes de hacer el save
subcriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status = 'expired'; // Si la fecha de renovacion es menor a la fecha actual, el estado es expirado
    }

    next(); // es nesesario para decirle al middleware que continue con el gurdado en la base de datos
})

const Subscription = mongoose.model('Subscription', subcriptionSchema);

export default Subscription;