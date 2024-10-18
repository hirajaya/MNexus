//packages
import path from 'path';
import express from 'express';
import dotevn from 'dotenv';
import cookieParser from 'cookie-parser';

//utiles
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';
import promotionRoutes from './routes/promotionRoutes.js';
import deliveryPayrollRoutes from './routes/deliveryPayrollRoutes.js';
import musicRoutes from './routes/musicRoutes.js';
import albumRoutes from './routes/albumRoutes.js';
import inquiriesRoutes from './routes/inquiryRoutes.js'
import offerRoutes from './routes/offerRoutes.js'
import artistRoutes from './routes/artistRoutes.js'
import driverRoutes from './routes/driverRoutes.js'
import venueRoutes from './routes/venueRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import postRoutes from './routes/postRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import payRoutes from './routes/payRoutes.js'
import playlistRoutes from './routes/playlistRoutes.js'
import artistsalesRoutes from './routes/artistSalesRoutes.js'
import payrollRoutes from './routes/payrollRoutes.js'

dotevn.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/deliverypayroll',deliveryPayrollRoutes);
app.use('/api/music', musicRoutes); 
app.use('/api/albums', albumRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/promotions', promotionRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/drivers', driverRoutes)
app.use('/api/artists', artistRoutes);
app.use('/api/dpayroll', deliveryPayrollRoutes);
app.use('/api/venue', venueRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/pay', payRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/artistsales', artistsalesRoutes);
app.use('/api/payroll', payrollRoutes);


app.get('/api/config/paypal', (req,res) =>{
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname+ '/uploads')))

app.listen(port, () => console.log(`Server running on port: ${port}`));


