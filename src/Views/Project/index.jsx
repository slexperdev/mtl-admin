import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import moment from "moment";

import Layout from "../../Layout";
import { AlertDialog, Table } from "../../Components";
import DepartmentForm from "./Project-form";

import { getFromLocalStorage } from "../../Util/Storage";
import { Constant } from "../../Constant";
import { deleteProject, getProjects } from "../../Services/ProjectService";

export default function ProjectView() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    id: "",
    name: "",
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

  const TABLE_HEAD = ["Name", "Type", "Created At", ""];

  const TABLE_ROWS = filterData.map(({ id, name, createdAt }) => ({
    id: id,
    name: name,
    userType: "Project",
    date: moment(createdAt).format("dddd, MMMM D, YYYY"),
  }));

  const searchHandler = (text) => {
    const result = projects.filter((value) => {
      return value.name.toLowerCase().includes(text.toLowerCase());
    });

    if (text === "") {
      setFilterData(projects);
    } else {
      setFilterData(result);
    }
  };

  const handleGetProjects = async () => {
    setIsLoading(true);
    const response = await getProjects();
    if (response.success) {
      setProjects(response.data);
      setFilterData(response.data);
    } else {
      alert({ message: "Something went wrong!", open: true });
    }
    setIsLoading(false);
  };

  const handleOpen = (id, name, type) => {
    setOpenForm(true);
    setInitialKey(Math.random());
    if (type === "edit") {
      setProject({ ...project, name: name, id: id });
    } else {
      setProject({ ...project, name: "", id: "" });
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
        <Typography variant="h5">Manage Projects</Typography>
        <div className="mt-10 border-2 border-orange-400">
          <div className="my-10 float-right mr-5">
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search Projects"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  onChange={(e) => searchHandler(e.target.value)}
                />
              </div>
              <Button
                className="flex items-center gap-3 bg-orange-400"
                color="blue"
                size="sm"
                onClick={() => handleOpen("", "", "add")}
              >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Project
              </Button>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center w-full my-10">
              <Typography variant="h4">Loading...</Typography>
            </div>
          ) : projects.length !== 0 ? (
            <Table
              TABLE_HEAD={TABLE_HEAD}
              TABLE_ROWS={TABLE_ROWS}
              onClickDelete={handleDeleteOpen}
              onClickEdit={handleOpen}
              toolTip={{ delete: "Delete Department", edit: "Edit Department" }}
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
      <DepartmentForm
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
