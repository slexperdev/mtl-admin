import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { getFromLocalStorage } from "../../Util/Storage";
import { Constant } from "../../Constant";
import { Alert } from "../../Components";
import { createProject, updateProject } from "../../Services/ProjectService";

export default function ProjectForm({
  open,
  getProjects,
  setOpenForm,
  project,
}) {
  const [projectData, setProjectData] = useState({
    name: project.name !== "" ? project.name : "",
    incentive:project.incentive
  });

  const [error, setError] = useState({
    open: false,
    message: "",
    color: "red",
  });

  useEffect(() => {
    if (error.open) {
      setTimeout(() => {
        setError({
          ...error,
          open: false,
          message: "",
          color: "red",
        });
      }, 3000);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectData.name === "") {
      setError({
        ...error,
        open: true,
        message: "Please fill all fields!",
      });
    } else {
      const token = await getFromLocalStorage(Constant.TOKEN);
      let res;

      if (project.name !== "") {
        res = await updateProject(project.id, projectData, token);
      } else res = await createProject(projectData, token);

      if (res.success) {
        getProjects();
        setOpenForm(false);
      } else {
        setError({
          ...error,
          open: true,
          message: "Something went wrong!",
          color: "amber",
        });
      }
    }
  };

  return (
    <Dialog open={open} handler={() => setOpenForm(false)}>
      <div className="flex items-center justify-between">
        <DialogHeader>
          {project.name !== "" ? "Edit" : "Add"} Project
        </DialogHeader>
        <XMarkIcon
          className="mr-3 h-5 w-5"
          onClick={() => setOpenForm(false)}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <DialogBody divider>
          <div className="grid gap-6">
            <Alert
              message={error.message}
              open={error.open}
              color={error.color}
            />
            <Input
              label="Project Name"
              color="orange"
              onChange={(e) =>
                setProjectData({ ...projectData, name: e.target.value })
              }
              value={projectData.name}
            />
          </div>
          <div className="grid gap-6 mt-5">
            <Input
              label="Incentive"
              color="orange"
              onChange={(e) =>
                setProjectData({ ...projectData, incentive: e.target.value })
              }
              value={projectData.incentive}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            color="orange"
            onClick={() => setOpenForm(false)}
          >
            close
          </Button>
          <Button variant="gradient" color="orange" type="submit">
            {project.name !== "" ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
