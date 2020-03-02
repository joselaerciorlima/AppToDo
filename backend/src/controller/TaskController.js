const {
  startOfDay,
  endOfDay,
  startOfWeek,
  lastDayOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
} = require("date-fns");
const TaskModel = require("../model/TaskModel");

// Armazena a data e a hora atual.
const current = new Date();

class TaskController {
  async create(req, res) {
    const task = new TaskModel(req.body);

    await task
      .save()
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async all(req, res) {
    await TaskModel.find({ macaddress: { $in: req.body.macaddress } })
      .sort("when")
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async show(req, res) {
    await TaskModel.findById(req.params.id)
      .then(task => {
        if (task) return res.status(200).json(task);
        else return res.status(404).json({ message: "tarefa não encontrada" });
      })
      .catch(error => {
        return res.status(500).json({ error });
      });
  }

  async update(req, res) {
    await TaskModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    })
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async delete(req, res) {
    await TaskModel.deleteOne({ _id: req.params.id })
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async done(req, res) {
    await TaskModel.findByIdAndUpdate(
      { _id: req.params.id },
      { done: req.params.done },
      { new: true }
    )
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async late(req, res) {
    await TaskModel.find({
      when: { $lt: current },
      macaddress: { $in: req.body.macaddress }
    })
      .sort("when")
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async today(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.body.macaddress },
      when: { $gte: startOfDay(current), $lt: endOfDay(current) }
    })
      .sort("when")
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async week(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.body.macaddress },
      when: { $gte: startOfWeek(current), $lt: lastDayOfWeek(current) }
    })
      .sort("when")
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async month(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.body.macaddress },
      when: { $gte: startOfMonth(current), $lt: endOfMonth(current) }
    })
      .sort("when")
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }
  async year(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.body.macaddress },
      when: { $gte: startOfYear(current), $lt: endOfYear(current) }
    })
      .sort("when")
      .then(task => {
        return res.status(200).json(task);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }
}

module.exports = new TaskController();
