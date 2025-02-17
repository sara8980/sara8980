
require('dotenv').config();
const express =require("express");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const my_eventsRouter = require('./routers/my_eventsRouter');
const customersRouter=require('./routers/customersRouter')
const categoriesRouter=require('./routers/categoriesRouter')
const business_ownersRouter=require('./routers/business_ownersRouter')
const my_eventsRoute=require('./routers/my_eventsRouter')
const businessRouter=require('./routers/businessRouter')
const productsRouter=require('./routers/productsRouter')
const business_in_eventRouter=require('./routers/business_in_eventRouter')
const config =require('./config/config')
app= express();
// app.use(express.static('public'));
// app.use(express.json()); // לניתוח JSON
// app.use(express.urlencoded({ extended: true })); // לניתוח נתונים מטפסים
// app.use(cors());
// app.use('/customers',customersRouter);
// app.use('/categories',categoriesRouter);
// app.use('/business_owners',business_ownersRouter);
// app.use('/events',my_eventsRoute);
// app.use('/business',businessRouter);
// app.use('/products',productsRouter);
// app.use('/business_in_event',business_in_eventRouter);


// const logDirectory = path.join(__dirname, 'logs');

// // יצירת תיקיית הלוגים אם אינה קיימת
// if (!fs.existsSync(logDirectory)) {
//     fs.mkdirSync(logDirectory);
// }

// // קובץ הלוגים
// const logStream = fs.createWriteStream(path.join(logDirectory, 'logger.log'), { flags: 'a' });

// // השתמש ב-Morgan עם תבנית לוג וכתוב לקובץ
// app.use(morgan('Method: :method URL: :url Status: :status', { stream: logStream }));


const logDirectory = path.join(__dirname, 'logs');

// יצירת תיקיית הלוגים אם אינה קיימת
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// קובץ הלוגים
const logStream = fs.createWriteStream(path.join(logDirectory, 'logger.log'), { flags: 'a' });

// הגדרת תבנית הלוג שכוללת את התאריך והשעה
app.use(morgan((tokens, req, res) => {
    return [
        moment().format('YYYY-MM-DD HH:mm:ss'), // תאריך ושעה
        'Method:', tokens.method(req, res),
        'URL:', tokens.url(req, res),
        'Status:', tokens.status(req, res),
    ].join(' ');
}, { stream: logStream }));

app.use(express.static('public'));
app.use(express.json()); // לניתוח JSON
app.use(express.urlencoded({ extended: true })); // לניתוח נתונים מטפסים
app.use(cors());
app.use('/customers',customersRouter);
app.use('/categories',categoriesRouter);
app.use('/business_owners',business_ownersRouter);
app.use('/events',my_eventsRoute);
app.use('/business',businessRouter);
app.use('/products',productsRouter);
app.use('/business_in_event',business_in_eventRouter);

// אם לא נמצא נתיב, הצג דף לא נמצא
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'not-found.html'));
});

// שמור את השרת פועל על הפורט שנקבע בקובץ config
app.listen(config.port, () => {
    console.log(`App is listening on port ${config.port} http://localhost:${config.port}`);
});



// יצירת תיקיית הלוגים אם אינה קיימת
// const logDirectory = path.join(__dirname, 'logs');
// if (!fs.existsSync(logDirectory)) {
//     fs.mkdirSync(logDirectory);
// }

// // קובץ הלוגים
// const logPath = path.join(logDirectory, 'logger.log');
// const logStream = fs.createWriteStream(logPath, { flags: 'a' });

// // הגדרת תבנית מותאמת אישית עם תאריך ושעה
// morgan.format('custom', (tokens, req, res) => {
//     const date = new Date();
//     const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    
//     // משתמש ב-tokens.url() כדי להדפיס את ה-URL הנכון
//     return `${formattedDate} - Method: ${tokens.method(req, res)} URL: ${tokens.url(req, res)} Status: ${tokens.status(req, res)}`;
// });

// // השתמש ב-Morgan עם התבנית המותאמת אישית וכתוב לקובץ
// app.use(morgan('custom', { stream: logStream }));

// // דוגמאות לנתיבים (לא צריך להוסיף כל אחד בנפרד)

// // app.get('/',(req,res)=>{
// //     res.send("hello-word");
// // })
// app.use('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'not-found.html'));
// })



// app.listen(config.port,(req,res)=>{
//     console.log(`app is listenning on port ${config.port} http://localhost:${config.port}`)
// })

// require('dotenv').config();
// const express = require("express");
// const cors = require('cors');
// const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');
// const config = require('./config/config');

// const app = express();

// // הגדרת static ו-JSON
// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // יצירת תיקיית הלוגים אם אינה קיימת
// const logDirectory = path.join(__dirname, 'logs');
// if (!fs.existsSync(logDirectory)) {
//     fs.mkdirSync(logDirectory);
// }

// // קובץ הלוגים
// const logPath = path.join(logDirectory, 'logger.log');
// const logStream = fs.createWriteStream(logPath, { flags: 'a' });

// // הגדרת תבנית מותאמת אישית עם תאריך ושעה
// morgan.format('custom', (tokens, req, res) => {
//     const date = new Date();
//     const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    
//     // משתמש ב-tokens.url() כדי להדפיס את ה-URL הנכון
//     return `${formattedDate} - Method: ${tokens.method(req, res)} URL: ${tokens.url(req, res)} Status: ${tokens.status(req, res)}`;
// });

// // השתמש ב-Morgan עם התבנית המותאמת אישית וכתוב לקובץ
// app.use(morgan('custom', { stream: logStream }));

// // הגדרת הנתיבים שלך
// app.get('/', (req, res) => {
//     res.send("Hello, world!");
// });

// app.get('/another-route', (req, res) => {
//     res.send("This is another route");
// });

// // אם לא נמצא נתיב, הצג דף לא נמצא
// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'not-found.html'));
// });

// // שמור את השרת פועל על הפורט שנקבע בקובץ config
// app.listen(config.port, () => {
//     console.log(`App is listening on port ${config.port} http://localhost:${config.port}`);
// });
