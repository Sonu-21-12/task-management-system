import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    Calendar,
    User,
    Clock,
    MessageSquare,
    Trash2,
    Send,
    Edit
} from "lucide-react";

import { getTaskById } from "../services/taskService";
import {
    getComments,
    createComment,
    deleteComment
} from "../services/commentServices";


function TaskDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState(null);

    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true);

    const [commentLoading, setCommentLoading] = useState(false);


    // =========================
    // Load task
    // =========================

    const loadTask = async () => {

        try {

            setLoading(true);

            const response = await getTaskById(id);

            console.log("Task details response:", response);

            if (response.success) {
                setTask(response.data);
            }

        } catch (error) {

            console.error(
                "Task details error:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // Load comments
    // =========================

    const loadComments = async () => {

        try {

            const response =
                await getComments(id);

            console.log(
                "Comments response:",
                response
            );

            if (response.success) {
                setComments(response.data || []);
            }

        } catch (error) {

            console.error(
                "Comments error:",
                error
            );

        }

    };


    useEffect(() => {

        loadTask();

        loadComments();

    }, [id]);


    // =========================
    // Add comment
    // =========================

    const handleComment = async (e) => {

        e.preventDefault();

        if (!comment.trim()) {
            return;
        }

        try {

            setCommentLoading(true);

            const response =
                await createComment(
                    id,
            {  
                comment :  comment.trim()
                }
                );

            console.log(
                "Create comment response:",
                response
            );

            if (response.success) {

                setComment("");

                await loadComments();

            }

        } catch (error) {

            console.error(
                "Create comment error:",
                error
            );

        } finally {

            setCommentLoading(false);
        }

    };


    // =========================
    // Delete comment
    // =========================

    const handleDeleteComment = async (
        commentId
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this comment?"
            );

        if (!confirmed) {
            return;
        }

        try {

            const response =
                await deleteComment(commentId);

            if (response.success) {

                setComments(
                    comments.filter(
                        (item) =>
                            item.id !== commentId
                    )
                );

            }

        } catch (error) {

            console.error(
                "Delete comment error:",
                error
            );

        }

    };


    // =========================
    // Loading
    // =========================

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">

                <div className="text-slate-500">
                    Loading task...
                </div>

            </div>
        );

    }


    if (!task) {

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">

                <h2 className="text-xl font-semibold text-slate-800">
                    Task not found
                </h2>

                <button
                    onClick={() => navigate("/tasks")}
                    className="mt-4 text-indigo-600"
                >
                    Back to Tasks
                </button>

            </div>
        );

    }


    return (

        <div className="min-h-screen bg-slate-50">

            {/* ================= HEADER ================= */}

            <div className="bg-white border-b">

                <div className="max-w-6xl mx-auto px-6 py-5">

                    <button
                        onClick={() =>
                            navigate("/tasks")
                        }
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-5"
                    >

                        <ArrowLeft size={18} />

                        Back to Tasks

                    </button>


                    <div className="flex items-center justify-between">

                        <div>

                            <h1 className="text-3xl font-bold text-slate-900">

                                {task.title}

                            </h1>

                            <p className="text-slate-500 mt-1">
                                Task Details
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate(
                                    `/tasks/${id}/edit`
                                )
                            }
                            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800"
                        >

                            <Edit size={18} />

                            Edit Task

                        </button>

                    </div>

                </div>

            </div>


            {/* ================= CONTENT ================= */}

            <div className="max-w-6xl mx-auto px-6 py-8">

                <div className="grid lg:grid-cols-3 gap-6">


                    {/* ================= TASK INFO ================= */}

                    <div className="lg:col-span-2">

                        <div className="bg-white rounded-2xl border p-6 shadow-sm">

                            <h2 className="text-xl font-semibold text-slate-900 mb-4">
                                Description
                            </h2>


                            <p className="text-slate-600 leading-7">

                                {task.description ||
                                    "No description provided."}

                            </p>


                            {/* Status / Priority */}

                            <div className="grid sm:grid-cols-2 gap-4 mt-8">

                                <div className="border rounded-xl p-4">

                                    <p className="text-sm text-slate-500">
                                        Status
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {task.status}
                                    </p>

                                </div>


                                <div className="border rounded-xl p-4">

                                    <p className="text-sm text-slate-500">
                                        Priority
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {task.priority}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* ================= COMMENTS ================= */}

                        <div className="bg-white rounded-2xl border p-6 shadow-sm mt-6">

                            <div className="flex items-center gap-2 mb-6">

                                <MessageSquare
                                    size={20}
                                    className="text-indigo-600"
                                />

                                <h2 className="text-xl font-semibold">
                                    Comments
                                </h2>

                            </div>


                            {/* Add comment */}

                            <form
                                onSubmit={
                                    handleComment
                                }
                                className="flex gap-3 mb-8"
                            >

                                <input
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Write a comment..."
                                    className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                />


                                <button
                                    type="submit"
                                    disabled={
                                        commentLoading
                                    }
                                    className="bg-indigo-600 text-white px-5 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
                                >

                                    <Send size={18} />

                                </button>

                            </form>


                            {/* Comments list */}

                            <div className="space-y-4">

                                {comments.length === 0 ? (

                                    <div className="text-center py-8 text-slate-400">

                                        No comments yet.

                                    </div>

                                ) : (

                                    comments.map(
                                        (item) => (

                                            <div
                                                key={item.id}
                                                className="border rounded-xl p-4"
                                            >

                                                <div className="flex justify-between">

                                                    <div>

                                                        <p className="font-semibold text-slate-800">

                                                            {item.user_name ||
                                                                "User"}

                                                        </p>

                                                        <p className="text-xs text-slate-400 mt-1">

                                                            {item.created_at
                                                                ? new Date(
                                                                      item.created_at
                                                                  ).toLocaleString()
                                                                : ""}

                                                        </p>

                                                    </div>


                                                    <button
                                                        onClick={() =>
                                                            handleDeleteComment(
                                                                item.id
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700"
                                                    >

                                                        <Trash2
                                                            size={
                                                                17
                                                            }
                                                        />

                                                    </button>

                                                </div>


                                                <p className="text-slate-600 mt-3">

                                                    {
                                                        item.comment
                                                    }

                                                </p>

                                            </div>

                                        )
                                    )

                                )}

                            </div>

                        </div>

                    </div>


                    {/* ================= SIDEBAR ================= */}

                    <div>

                        <div className="bg-white rounded-2xl border p-6 shadow-sm">

                            <h2 className="font-semibold text-lg mb-6">
                                Task Information
                            </h2>


                            <div className="space-y-6">


                                <div className="flex gap-3">

                                    <User
                                        size={20}
                                        className="text-slate-400"
                                    />

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            Assigned To
                                        </p>

                                        <p className="font-medium">
                                            {task.assigned_user ||
                                                "Unassigned"}
                                        </p>

                                    </div>

                                </div>


                                <div className="flex gap-3">

                                    <Calendar
                                        size={20}
                                        className="text-slate-400"
                                    />

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            Due Date
                                        </p>

                                        <p className="font-medium">
                                            {task.due_date
                                                ? new Date(
                                                      task.due_date
                                                  ).toLocaleDateString()
                                                : "No due date"}
                                        </p>

                                    </div>

                                </div>


                                <div className="flex gap-3">

                                    <Clock
                                        size={20}
                                        className="text-slate-400"
                                    />

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            Created
                                        </p>

                                        <p className="font-medium">
                                            {task.created_at
                                                ? new Date(
                                                      task.created_at
                                                  ).toLocaleDateString()
                                                : "-"}
                                        </p>

                                    </div>

                                </div>


                                <div className="border-t pt-5">

                                    <p className="text-sm text-slate-500">
                                        Created By
                                    </p>

                                    <p className="font-medium mt-1">
                                        {task.creator_name ||
                                            "Unknown"}
                                    </p>

                                </div>


                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default TaskDetails;