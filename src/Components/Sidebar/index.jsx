import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  StarIcon,
  ClockIcon,
  UsersIcon,
  Cog6ToothIcon,
  PowerIcon,
  TagIcon,
} from "@heroicons/react/24/solid";

import { removeFromLocalStorage } from "../../Util/Storage";
import { Constant } from "../../Constant";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await removeFromLocalStorage(Constant.AUTHENTICATED);
    await removeFromLocalStorage(Constant.TOKEN);
    navigate("/");
  };

  return (
    <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-64 max-w-[20rem] shadow-2xl shadow-blue-gray-900/3">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          MTL
        </Typography>
      </div>
      <List>
        {/* <ListItem className="hover:bg-orange-400 focus:bg-orange-400 active:bg-violet-700 ">
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem> */}

        <NavLink
          to={"/employees"}
          className={({ isActive }) => isActive && "bg-orange-400 rounded-lg"}
        >
          <ListItem className="hover:bg-orange-400">
            <ListItemPrefix>
              <UsersIcon className="h-5 w-5" />
            </ListItemPrefix>
            Employee
          </ListItem>
        </NavLink>

        <NavLink
          to={"/timelogs"}
          className={({ isActive }) => isActive && "bg-orange-400 rounded-lg"}
        >
          <ListItem className="hover:bg-orange-400">
            <ListItemPrefix>
              <ClockIcon className="h-5 w-5" />
            </ListItemPrefix>
            Summery
          </ListItem>
        </NavLink>

        <NavLink
          to={"/projects"}
          className={({ isActive }) => isActive && "bg-orange-400 rounded-lg"}
        >
          <ListItem className="hover:bg-orange-400">
            <ListItemPrefix>
              <TagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Projects
          </ListItem>
        </NavLink>

        <NavLink
          to={"/departments"}
          className={({ isActive }) => isActive && "bg-orange-400 rounded-lg"}
        >
          <ListItem className="hover:bg-orange-400">
            <ListItemPrefix>
              <StarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Departments
          </ListItem>
        </NavLink>

        {/* <ListItem className="hover:bg-orange-400 focus:bg-orange-400">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem> */}

        <ListItem
          className="hover:bg-orange-400 focus:bg-orange-400"
          onClick={handleLogout}
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};
