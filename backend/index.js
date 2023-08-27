

const express = require('express')
const app = express()
const port = 5000



const connectToMongo=require('./db');
connectToMongo();

app.use(express.json());

app.use("/api/auth",require('./routes/auth'))
app.use("/api/notes",require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// const start = async () => {
//     try {
//       await connectToMongo();
//       app.listen(port, () => {
//         console.log(`Connected to ${port}`);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };