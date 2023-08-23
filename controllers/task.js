import { Error } from "mongoose";
import { Task } from "../models/task.js"
import ErrorHandler from "../middlewares/error.js";

export const newTask = async(req, res, next) => {

    try {
        const {title, description} = req.body

        if(!title && !description){
            return res.json({
                success: false,
                message: "Title and Description both is mendetory"
            });
        };
    
        await Task.create({
            title,
            description,
            user: req.user
        });
    
        res.status(201).json({
            success: true,
            message: "Task Added Successfully"
        });

    } catch (error) {
        next(error)
    };

};

export const getMytask = async(req, res, next) => {

    try {
        const userid = req.user._id;

        const tasks = await Task.find({user: userid})
    
        res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {
        next(error)
    };

};
export const updatetask = async(req, res, next) => {

    try {
        const {id} = req.params;

        const task = await Task.findById(id);
    
        if(!task){
            return next(new ErrorHandler())
        };
    
        task.isCompleted = !task.isCompleted;
    
        await task.save();
    
        res.status(200).json({
            success: true,
            message: "Task Updated!!"
        });

    } catch (error) {
        next(error)
    };

};
export const deletetask = async(req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return next(new Error("Invalid Id"));
        };
    
        await task.deleteOne();    
    
        res.status(200).json({
            success: true,
            message: "Task deleted!!"
        });

    } catch (error) {
        next(error)
    };

};