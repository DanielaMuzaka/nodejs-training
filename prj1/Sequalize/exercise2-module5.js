// assigment 2
// nmp init  (to install npm, when is terminated appears the package.json)
// nmp install --save express (to install express.js, when is terminated appears the node_module folder)
// npm install --save-dev nodemon (to install nodemon)



// const express = require('express');

// const app = express();

// app.use((req, res, next) => {
//     console.log('The first middleware.');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('The second middleware');
//     res.send('<p> Exercise solved! </p>');
// });

// app.listen(3000);


const express = require('express');

const app = express();

app.use('/users' , (req,res,next)=>{
console.log('/users middleware');
res.send('<p>The paragraph that handles /users </p>');
});

app.use('/', (req,res,next)=>{
    console.log('/middleware');
    res.send('<p>The paragraph that handles just / </p>');
});

app.listen(3000);



