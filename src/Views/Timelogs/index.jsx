import React, { useEffect, useState } from "react";
import {
  Input,
  Typography,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { getAllTimeLogs, pauseTime } from "../../Services/TimeLogs";
import { getFromLocalStorage } from "../../Util/Storage";

import { TimeLogsTable } from "./TimeLogsTable";
import Layout from "../../Layout";
import moment from "moment";
import { Constant } from "../../Constant";

export default function TimeLogView() {
  const [timeLogs, setTimeLogs] = useState([]);
  const [filterTimeLogs, setFilterTimeLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const TABLE_HEAD = [
    "Name",
    "Department",
    "Project",
    "Time Consumed",
    "Timer",
  ];

  useEffect(() => {
    handleGetTimeLogs(page);
  }, [page]);

  const handleGetTimeLogs = async (page) => {
    setIsLoading(true);
    const response = await getAllTimeLogs(page);

    if (response.success) {
      setFilterTimeLogs(response.data);
      setTimeLogs(response.data);
      setIsLoading(false);
    } else {
      alert("Something went wrong!");
      setIsLoading(false);
    }
  };

  const goToPreviousPage = () => {
    if (page >= 1) {
      setPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (filterTimeLogs.length !== 0) {
      setPage((prev) => prev + 1);
    }
  };

  const TABLE_ROWS = filterTimeLogs.map(
    ({ user, project, department, timeConsumed, isPaused }) => ({
      user: user?.name,
      project: project?.name,
      department: department?.name,
      timeConsumed: moment.utc(timeConsumed * 1000).format("H:mm"),
      isPaused: isPaused,
      id: user?.id,
    })
  );

  const ProjectNames = Array.from(
    new Set(timeLogs?.map((item) => item.project.name))
  );

  const handleFilterTimeLogs = (e) => {
    const text = e.target.id;
    setIsLoading(true);
    const result = timeLogs.filter((value) => {
      return value.project.name.toLowerCase().includes(text.toLowerCase());
    });

    if (text === "") {
      setFilterTimeLogs(timeLogs);
      setIsLoading(false);
    } else {
      setFilterTimeLogs(result);
      setIsLoading(false);
    }
  };

  const handlePauseFilter = (e) => {
    const text = e.target.value;
    setIsLoading(true);
    const result = timeLogs.filter((value) => value.isPaused === +text);

    if (text === "") {
      setFilterTimeLogs(timeLogs);
      setIsLoading(false);
    } else {
      setFilterTimeLogs(result);
      setIsLoading(false);
    }
  };

  const handleCompleteFilter = (e) => {
    const text = e.target.value;
    console.log('text',typeof text)
    setIsLoading(true);
    const result = timeLogs.filter((value) =>
      value.isCompleted === +text
    );

    if (text === "") {
      setFilterTimeLogs(timeLogs);
      setIsLoading(false);
    } else {
      setFilterTimeLogs(result);
      setIsLoading(false);
    }
  };

  const handlePauseStart = async (id, data) => {
    const token = await getFromLocalStorage(Constant.TOKEN);
    const res = await pauseTime(id, data, token);
    handleGetTimeLogs(page);
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <Typography variant="h5">Summary</Typography>
        <div className="mt-10 border-2 border-orange-400">
          <div className="my-10 ml-5">
            <div className="w-full md:w-75">
              <select
                className="border-solid border-2 border-orange-400 p-2 rounded-lg px-4 w-56"
                defaultValue="Select Project"
                onChange={handleFilterTimeLogs}
              >
                {ProjectNames.map((item, idx) => (
                  <option id={idx}>{item}</option>
                ))}
              </select>
              <select
                className="border-solid border-2 border-orange-400 p-2 rounded-lg px-4 w-56 ml-5"
                defaultValue="Pause"
                onChange={handlePauseFilter}
              >
                <option value={""}></option>
                <option value={"0"}>Ongoing</option>
                <option value={"1"}>Paused</option>
              </select>
              <select
                className="border-solid border-2 border-orange-400 p-2 rounded-lg px-4 w-56 ml-5"
                defaultValue="Complete"
                onChange={handleCompleteFilter}
              >
                <option value={""}></option>
                <option value={"0"}>Ongoing</option>
                <option value={"1"}>Completed</option>
              </select>
              <Button
                className="ml-2 bg-orange-400"
                onClick={() => setFilterTimeLogs(timeLogs)}
              >
                CLEAR FILTER
              </Button>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center w-full my-10">
              <Typography variant="h4">Loading...</Typography>
            </div>
          ) : timeLogs.length !== 0 ? (
            <TimeLogsTable
              TABLE_HEAD={TABLE_HEAD}
              TABLE_ROWS={TABLE_ROWS}
              page={page}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
              handlePauseStart={handlePauseStart}
            />
          ) : (
            <div className="flex justify-center items-center w-full my-10">
              <Typography variant="p">
                There are no projects available!
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
