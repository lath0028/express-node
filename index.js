const Joi=require('joi');
const express = require('express');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

const courses = [
    {id:1,name:'Security'},
    {id:2,name:'OOP'},
    {id:3,name:'Database'},
    
];



app.post('/api/courses', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(6).required()
 });

    const result = schema.validate(req.body);
    res.send(result);
    

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course does not exist');
    res.send(course);

});

const port = process.env.PORT || 3000;
 
app.listen(port, () => console.log(`listening port ${port}`));


