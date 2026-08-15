const { z } = require("zod");

const commentSchema = z.object({

    comment: z
        .string()
        .min(1, "Comment cannot be empty")
        .max(2000, "Comment is too long")

});

module.exports = {
    commentSchema
};