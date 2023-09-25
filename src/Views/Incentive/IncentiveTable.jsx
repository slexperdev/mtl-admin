import React, {useState} from "react";
import {Button, Typography} from "@material-tailwind/react";

export const IncentiveTable = ({
                                   TABLE_ROWS, TABLE_HEAD, page, goToNextPage, goToPreviousPage, handlePauseStart,
                               }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (<>
        <table className="mt- w-full min-w-max table-auto text-left">
            <thead className="bg-orange-400">
            <tr>
                {TABLE_HEAD.map((head) => (<th key={head} className="border-y  p-4">
                    <Typography variant="small" color="white" className="font-bold">
                        {head}
                    </Typography>
                </th>))}
            </tr>
            </thead>
            <tbody>
            {TABLE_ROWS.map(({
                                 employee_name, project_name, incentive, employee_incentive, id, total_time, time
                             }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (<tr key={index}>
                    <td className={classes}>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {employee_name}
                                </Typography>
                            </div>
                        </div>
                    </td>
                    <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {project_name}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {incentive}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {total_time}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {time}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {employee_incentive}
                        </Typography>
                    </td>
                </tr>);
            })}
            </tbody>
        </table>
        {TABLE_ROWS.length > 10 && (<div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
                Page {page}
            </Typography>
            <div className="flex gap-2">
                <Button
                    variant="outlined"
                    color="blue-gray"
                    size="sm"
                    onClick={goToPreviousPage}
                >
                    Previous
                </Button>
                <Button
                    variant="outlined"
                    color="blue-gray"
                    size="sm"
                    onClick={goToNextPage}
                >
                    Next
                </Button>
            </div>
        </div>)}
    </>);
};
