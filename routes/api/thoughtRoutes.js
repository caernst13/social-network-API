const router = require('express').Router();
const {
    getThougts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReation,
    addReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThougts).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReation);

module.exports = router;