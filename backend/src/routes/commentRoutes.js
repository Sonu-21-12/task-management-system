const express = require("express");

const authenticate =
    require("../middleware/authMiddleware");

const validate =
    require("../middleware/validateMiddleware");

const {
    commentSchema
} = require("../validators/comentValidator");

const {
    getComments,
    createComment,
    updateComment,
    deleteComment
} = require("../controllers/commentController");

const router = express.Router();


// Get comments for task
router.get(
    "/tasks/:taskId/comments",
    authenticate,
    getComments
);


// Add comment
router.post(
    "/tasks/:taskId/comments",
    authenticate,
    validate(commentSchema),
    createComment
);


// Update comment
router.put(
    "/comments/:id",
    authenticate,
    validate(commentSchema),
    updateComment
);


// Delete comment
router.delete(
    "/comments/:id",
    authenticate,
    deleteComment
);


module.exports = router;