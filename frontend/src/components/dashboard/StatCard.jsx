function StatCard({
    title,
    value,
    description,
    icon,
    iconClassName = "bg-slate-100 text-slate-700"
}) {

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </h3>

                    {description && (
                        <p className="mt-2 text-xs text-slate-500">
                            {description}
                        </p>
                    )}

                </div>


                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default StatCard;