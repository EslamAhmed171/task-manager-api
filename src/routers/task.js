const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) =>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) =>{
    const match = {}
    match.owner = req.user._id
    if (req.query.compeleted){
        match.compeleted = req.query.compeleted === 'true'
    }

    const sort = {}
    if (req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'asec' ? 1 : -1
        console.log(sort)
    }
    try{
        const tasks = await Task.find(match)
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
        .sort(sort);
        
        res.send(tasks);
    }catch(e){
        res.status(500).send()
    }

})

router.get('/tasks/:id', auth, async (req, res) =>{
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        console.log(task)
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


router.patch('/tasks/:id', auth, async(req, res) =>{
    const updates = Object.keys(req.body)
    const validUpdates = ['description', 'compeleted']
    const isValid = updates.every((update) => validUpdates.includes(update))
    
    if (!isValid){
        return res.status(400).send('error: invaild update')
    }

    const _id = req.params.id;
    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        
        if (!task){
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save()
    
        res.send(task)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async(req, res) => {

    try{
        const _id = req.params.id;
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})

        if (!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = router