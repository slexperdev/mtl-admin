import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { createUser, updateUser } from "../../Services/UserService";

import { getFromLocalStorage } from "../../Util/Storage";
import { Constant } from "../../Constant";
import { Alert } from "../../Components";

export default function EmployeeForm({ open, getUsers, setOpenForm, user }) {
  const [userData, setUserData] = useState({
    name: user.name !== "" ? user.name : "",
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
    if (userData.name === "") {
      setError({
        ...error,
        open: true,
        message: "Please fill username field!",
      });
    } else {
      const token = await getFromLocalStorage(Constant.TOKEN);
      let res;

      if (user.name !== "") {
        res = await updateUser(user.id, userData, token);
      } else res = await createUser(userData, token);

      if (res.success) {
        getUsers();
        setOpenForm(false);
      } else {
        setError({
          ...error,
          open: true,
          message: "Check your internet connection!",
          color: "amber",
        });
      }
    }
  };

  return (
    <Dialog open={open} handler={() => setOpenForm(false)}>
      <div className="flex items-center justify-between">
        <DialogHeader>
          {user.name !== "" ? "Edit" : "Add"} Employee
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
              label="Employee Name"
              color="orange"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              value={userData.name}
            />
            <Input label="User Type" color="orange" value={"Labour"} disabled />
            {/* <Select
              label="Select User Type"
              color="orange"
              onChange={(value) =>
                setUserData({ ...userData, userType: value })
              }
              value={userData.userType}
            >
              <Option value={1}>Admin</Option>
              <Option value={0}>Employee</Option>
            </Select> */}
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
            {user.name !== "" ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
