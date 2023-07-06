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
import {
  createDepartment,
  updateDepartment,
} from "../../Services/DepartmentService";

export default function DepartmentForm({
  open,
  getDepartments,
  setOpenForm,
  department,
}) {
  const [departmentData, setDepartmentData] = useState({
    name: department.name !== "" ? department.name : "",
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
    if (departmentData.name === "") {
      setError({
        ...error,
        open: true,
        message: "Please fill name field!",
      });
    } else {
      const token = await getFromLocalStorage(Constant.TOKEN);
      let res;

      if (department.name !== "") {
        res = await updateDepartment(department.id, departmentData, token);
      } else res = await createDepartment(departmentData, token);

      if (res.success) {
        getDepartments();
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
          {department.name !== "" ? "Edit" : "Add"} Department
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
              label="Department Name"
              color="orange"
              onChange={(e) =>
                setDepartmentData({ ...departmentData, name: e.target.value })
              }
              value={departmentData.name}
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
            {department.name !== "" ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
