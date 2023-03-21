const { Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find().then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
      ).catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then(({_id}) => {
            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: _id} },
                { new: true }
            )
        }).then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : Thought.deleteMany({ _id: { $in: thought.thoughts } })
        ).then(() => res.json({ message: 'thought and thoughts!' }))
        .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reaction: req.body } },
            { runValidators: true, new: true }
        ).then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: { reaction: req.params.reactionId } },
            { new: true }
        ).then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    }
}