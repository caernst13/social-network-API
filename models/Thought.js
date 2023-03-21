const { Schema, model } = require('mongooe');
const moment = require('moment')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        userName: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = course