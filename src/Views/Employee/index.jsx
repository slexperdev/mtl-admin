import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import moment from "moment";

import Layout from "../../Layout";
import { Alert, AlertDialog, Table } from "../../Components";
import EmployeeForm from "./Employee-form";

import { deleteUser, getUsers } from "../../Services/UserService";
import { getFromLocalStorage } from "../../Util/Storage";
import { Constant } from "../../Constant";

export default function EmployeesView() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
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
    handleGetUsers();
  }, []);

  const TABLE_HEAD = ["Name", "Type", "Employed", "", ""];

  const TABLE_ROWS = filterData.map(({ id, name, userType, createdAt }) => ({
    id: id,
    name: name,
    userType: userType === 0 ? "Labour" : "Admin",
    date: moment(createdAt).format("dddd, MMMM D, YYYY"),
  }));

  const searchHandler = (text) => {
    const result = users.filter((value) => {
      return value.name.toLowerCase().includes(text.toLowerCase());
    });

    if (text === "") {
      setFilterData(users);
    } else {
      setFilterData(result);
    }
  };

  const handleGetUsers = async () => {
    setIsLoading(true);
    const response = await getUsers();
    if (response.success) {
      setUsers(response.data);
      setFilterData(response.data);
    } else {
      Alert({ message: "Something went wrong!", open: true });
    }
    setIsLoading(false);
  };

  const handleOpen = (id, name, type) => {
    setOpenForm(true);
    setInitialKey(Math.random());
    if (type === "edit") {
      setUser({ ...user, name: name, id: id });
    } else {
      setUser({ ...user, name: "", id: "" });
    }
  };

  const handleDeleteOpen = (id) => {
    setOpenDeleteAlert(true);
    setDeleteId(id);
  };

  const handleDeleteSubmit = async () => {
    const token = await getFromLocalStorage(Constant.TOKEN);
    const res = await deleteUser(deleteId, token);

    if (res.success) {
      setOpenDeleteAlert(false);
      handleGetUsers();
    } else {
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <Typography variant="h5">Manage Employees</Typography>
        <div className="mt-10 border-2 border-orange-400">
          <div className="my-10 float-right mr-5">
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search Employee"
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
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Employee
              </Button>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center w-full my-10">
              <Typography variant="h4">Loading...</Typography>
            </div>
          ) : (
            <Table
              TABLE_HEAD={TABLE_HEAD}
              TABLE_ROWS={TABLE_ROWS}
              onClickDelete={handleDeleteOpen}
              onClickEdit={handleOpen}
              toolTip={{ delete: "Delete User", edit: "Edit User" }}
            />
          )}
        </div>
      </div>
      <EmployeeForm
        key={initialKey}
        open={openForm}
        user={user}
        setOpenForm={setOpenForm}
        getUsers={handleGetUsers}
      />
      <AlertDialog
        open={openDeleteAlert}
        setOpenDeleteAlert={setOpenDeleteAlert}
        title="You should read this!"
        message="Do you want to delete this department?"
        handleSubmit={handleDeleteSubmit}
      />
    </Layout>
  );
}
