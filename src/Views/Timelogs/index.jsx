import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

import Layout from "../../Layout";

import { getUsers } from "../../Services/UserService";

export default function TimeLogView() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetUsers = async () => {
    const response = await getUsers();
    console.log("users", response);
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <Typography variant="h5">Manage Time Logs</Typography>
      </div>
    </Layout>
  );
}
