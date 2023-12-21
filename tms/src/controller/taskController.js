const taskModel = require("../model/taskModel")


exports.createTask = async (req, res) => {
    const reqBody = req.body;

    try {
        const result = await taskModel.create(reqBody);
        res.status(200).json({
            message: 'Task created successfully',
            task: result,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.getTask = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await taskModel.find({ _id: id });
        res.status(200).json({
            message: 'Task fetched successfully',
            task: result,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.getTasks = async (req, res) => {
    try {
        const result = await taskModel.find();
        res.status(200).json({
            message: 'Tasks fetched successfully',
            tasks: result,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}


exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const updateBody = req.body;

    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            updateBody,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }


        res.status(200).json({
            message: 'Task updated successfully',
            updatedTask,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedTask = await taskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            message: 'Task deleted successfully',
            deletedTask,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
