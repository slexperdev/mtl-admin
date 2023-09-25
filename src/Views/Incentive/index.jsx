import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import moment from "moment";

import Layout from "../../Layout";
import { AlertDialog, Table } from "../../Components";
import ProjectForm from "./Project-form";

import { getFromLocalStorage } from "../../Util/Storage";
import { Constant } from "../../Constant";
import { deleteProject, getProjects } from "../../Services/ProjectService";
import {getIncentive} from "../../Services/IncentiveService";
import {IncentiveTable} from "./IncentiveTable";

export default function IncentiveView() {
  const [incentives, setIncentives] = useState([]);
  const [project, setProject] = useState({
    id: "",
    name: "",
    incentive: "",
  });
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  const [initialKey, setInitialKey] = useState(0);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    handleGetProjects();
  }, []);

  const TABLE_HEAD = ["Employee name", "Project name","Project Incentive (Rs. )", "Total project time (Minutes)","Employee time (Minutes)","Employee incentive (Rs. )"];

  const TABLE_ROWS = filterData.map(({ id, employee_name,employee_incentive,project_name,incentive,time,total_time }) => ({
    id: id,
    employee_name,
    project_name,
    total_time,
    time,
    incentive,
    employee_incentive,
  }));

  const searchHandler = (text) => {
    const result = incentives.filter((value) => {
      return value.employee_name.toLowerCase().includes(text.toLowerCase());
    });

    if (text === "") {
      setFilterData(incentives);
    } else {
      setFilterData(result);
    }
  };

  const handleGetProjects = async () => {
    setIsLoading(true);
    const response = await getIncentive();
    if (response.success) {
      setIncentives(response.data);
      setFilterData(response.data);
    } else {
      alert({ message: "Something went wrong!", open: true });
    }
    setIsLoading(false);
  };

  const handleOpen = (id, name, type,incentive) => {
    console.log('name',incentive)
    setOpenForm(true);
    setInitialKey(Math.random());
    if (type === "edit") {
      setProject({ ...project, name: name, id: id,incentive });
    } else {
      setProject({ ...project, name: "", id: "",incentive:"" });
    }
  };

  const handleDeleteOpen = (id) => {
    setOpenDeleteAlert(true);
    setDeleteId(id);
  };

  const handleDeleteSubmit = async () => {
    const token = await getFromLocalStorage(Constant.TOKEN);
    const res = await deleteProject(deleteId, token);

    if (res.success) {
      setOpenDeleteAlert(false);
      handleGetProjects();
    } else {
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <Typography variant="h5">Incentives</Typography>
        <div className="mt-10 border-2 border-orange-400">
          <div className="my-10 float-right mr-5">
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search Users"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  onChange={(e) => searchHandler(e.target.value)}
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center w-full my-10">
              <Typography variant="h4">Loading...</Typography>
            </div>
          ) : incentives.length !== 0 ? (
            <IncentiveTable
              TABLE_HEAD={TABLE_HEAD}
              TABLE_ROWS={TABLE_ROWS}
              onClickDelete={handleDeleteOpen}
              onClickEdit={handleOpen}
              toolTip={{ delete: "Delete Department", edit: "Edit Department" }}
            />
          ) : (
            <div className="flex justify-center items-center w-full my-10">
              <Typography variant="p">
                There are no incentives available!
              </Typography>
            </div>
          )}
        </div>
      </div>
      <ProjectForm
        key={initialKey}
        open={openForm}
        project={project}
        setOpenForm={setOpenForm}
        getProjects={handleGetProjects}
      />
      <AlertDialog
        open={openDeleteAlert}
        setOpenDeleteAlert={setOpenDeleteAlert}
        title="You should read this!"
        message="Do you want to delete this employee?"
        handleSubmit={handleDeleteSubmit}
      />
    </Layout>
  );
}
