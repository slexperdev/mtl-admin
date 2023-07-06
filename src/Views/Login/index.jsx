import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

import { Alert } from "../../Components";

import { loginUser } from "../../Services/UserService";
import { getFromLocalStorage, setLocalStorage } from "../../Util/Storage";
import { Constant } from "../../Constant";

export default function LoginView() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState({
    open: false,
    color: "red",
    message: "",
  });

  useEffect(() => {
    const getAuthenticated = async () => {
      const authenticated = await getFromLocalStorage(Constant.AUTHENTICATED);
      if (authenticated) {
        navigate("/employees");
      } else {
        navigate("/");
      }
    };
    getAuthenticated();
  }, []);

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

  const handelLogin = async (e) => {
    e.preventDefault();
    if (userData.name === "" || userData.password === "") {
      setError({
        ...error,
        open: true,
        message: "Please fill all required fields!",
      });
    } else {
      const res = await loginUser(userData.name, userData.password);
      console.log("res", res);
      if (res.success) {
        if (res.data.status) {
          await setLocalStorage(Constant.TOKEN, res.data.accessToken);
          await setLocalStorage(Constant.AUTHENTICATED, true);
          navigate("/employees");
        } else {
          setError({
            ...error,
            open: true,
            message: res.data.data,
          });
        }
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
    <div className="flex items-center justify-center h-screen ">
      <Card
        className="px-4 py-10 border-2 border-orange-400 items-center relative"
        color="transparent"
        shadow={false}
      >
        <Typography variant="h2" className="mt-4">
          MTL
        </Typography>
        <Typography variant="p">Enter your details to admin login.</Typography>
        <div className="absolute top-32 left-4 right-4">
          <Alert
            message={error.message}
            open={error.open}
            color={error.color}
          />
        </div>
        <form
          onSubmit={handelLogin}
          className="mt-16 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6 ">
            <Input
              size="lg"
              label="Name"
              color="orange"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            <Input
              type="password"
              size="lg"
              color="orange"
              label="Password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>

          <Button fullWidth color="orange" type="submit" className="mt-6">
            LOGIN
          </Button>
        </form>
      </Card>
    </div>
  );
}
