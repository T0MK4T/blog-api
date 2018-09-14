const express = require("express");
const router = express.Router();

const {BlogPosts} = require("./models");


BlogPosts.create('The New Apple Iphone Xs', 'Many strong oppinions on the new phones released', 'Apple Insider', '9/14/2018');


router.get('/',(req,res) =>{
	res.json(BlogPosts.get());
});

router.delete('/:id', (req,res) =>{
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post with id ${req.params.ID}`);
	res.status(204).end();
});

router.post('/', (req,res) => {
	const requiredFields = ["title","content","author"];
	for (let i=0;i<requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing ${field} in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title,req.body.content, req.body.author);
	res.status(201).json(item);
});

router.put('/', (req,res) => {
	const requiredFields = ["id","title","content","author","publishDate"];
	for (let i=0;i<requiredFields.length; i++){
		const field = requiredFields[i];
		if(!(field in req.body)){
			const message = `Missing ${field} in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	if (req.params.id !== req.body.id){
		const message = `REquest path id ${req.params.id} and request body id ${req.body.id} must match`;
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating blog post with id ${req.params.id}`);
	BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	});
	res.status(204).end();
});

module.exports = router;
