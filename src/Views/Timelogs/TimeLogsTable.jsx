import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";

export const TimeLogsTable = ({
  TABLE_ROWS,
  TABLE_HEAD,
  page,
  goToNextPage,
  goToPreviousPage,
  handlePauseStart,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <table className="mt- w-full min-w-max table-auto text-left">
        <thead className="bg-orange-400">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-y  p-4">
                <Typography variant="small" color="white" className="font-bold">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(
            (
              { user, department, project, timeConsumed, isPaused, id },
              index
            ) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  {/* 
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={userType}
                        color="green"
                      />
                    </div>
                  </td> */}
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {project}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {department}
                    </Typography>
                  </td>

                  {/* <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {startTime}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {endTime}
                    </Typography>
                  </td> */}
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {timeConsumed}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {isPaused === 1 ? (
                      <button
                        className="text-sm text-blue-500 font-bold-sm"
                        onClick={() => handlePauseStart(id, { isPause: 0 })}
                      >
                        START
                      </button>
                    ) : (
                      <button
                        className="text-sm text-green-500 font-bold-sm"
                        onClick={() => handlePauseStart(id, { isPause: 1 })}
                      >
                        PAUSE
                      </button>
                    )}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      {TABLE_ROWS.length > 10 && (
        <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
        </div>
      )}
    </>
  );
};
