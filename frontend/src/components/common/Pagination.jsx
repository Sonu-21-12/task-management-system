import {
    ChevronLeft,
    ChevronRight
} from "lucide-react";


function Pagination({
    page,
    totalPages,
    total,
    limit,
    setPage
}) {

    if (!total || totalPages <= 1) {
        return null;
    }


    const start =
        (page - 1) * limit + 1;

    const end =
        Math.min(page * limit, total);


    return (

        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 sm:flex-row">

            <p className="text-sm text-slate-500">

                Showing{" "}

                <span className="font-medium text-slate-900">
                    {start}
                </span>

                {" "}to{" "}

                <span className="font-medium text-slate-900">
                    {end}
                </span>

                {" "}of{" "}

                <span className="font-medium text-slate-900">
                    {total}
                </span>

                {" "}tasks

            </p>


            <div className="flex items-center gap-2">

                <button
                    disabled={page === 1}
                    onClick={() =>
                        setPage(page - 1)
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                >

                    <ChevronLeft size={16} />

                    Previous

                </button>


                <span className="px-3 text-sm text-slate-600">

                    Page {page} of {totalPages}

                </span>


                <button
                    disabled={page === totalPages}
                    onClick={() =>
                        setPage(page + 1)
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
                >

                    Next

                    <ChevronRight size={16} />

                </button>

            </div>

        </div>
    );
}


export default Pagination;