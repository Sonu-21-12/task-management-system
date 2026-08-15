const commentService =
    require("../services/comentServices");


// GET COMMENTS
const getComments = async (
    req,
    res,
    next
) => {

    try {

        const comments =
            await commentService
                .getCommentsByTaskId(
                    req.params.taskId
                );

        return res.status(200).json({
            success: true,
            data: comments
        });

    } catch (error) {

        next(error);
    }
};


// CREATE COMMENT
const createComment = async (
    req,
    res,
    next
) => {

    try {

        const {
            comment
        } = req.body;


        const commentId =
            await commentService.createComment({

                taskId: req.params.taskId,

                userId: req.user.id,

                comment
            });


        const newComment =
            await commentService
                .getCommentById(commentId);


        return res.status(201).json({

            success: true,

            message: "Comment added successfully",

            data: newComment
        });

    } catch (error) {

        next(error);
    }
};


// UPDATE COMMENT
const updateComment = async (
    req,
    res,
    next
) => {

    try {

        const {
            comment
        } = req.body;


        const existingComment =
            await commentService
                .getCommentById(
                    req.params.id
                );


        if (!existingComment) {

            return res.status(404).json({

                success: false,

                message: "Comment not found"
            });
        }


        // Only comment owner can edit
        if (
            existingComment.user_id !==
            req.user.id
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You can only edit your own comments"
            });
        }


        await commentService.updateComment(
            req.params.id,
            comment
        );


        return res.status(200).json({

            success: true,

            message:
                "Comment updated successfully"
        });

    } catch (error) {

        next(error);
    }
};


// DELETE COMMENT
const deleteComment = async (
    req,
    res,
    next
) => {

    try {

        const existingComment =
            await commentService
                .getCommentById(
                    req.params.id
                );


        if (!existingComment) {

            return res.status(404).json({

                success: false,

                message: "Comment not found"
            });
        }


        // Owner or admin can delete
        if (
            existingComment.user_id !==
            req.user.id &&
            req.user.role !== "admin"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to delete this comment"
            });
        }


        await commentService.deleteComment(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Comment deleted successfully"
        });

    } catch (error) {

        next(error);
    }
};


module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment
};