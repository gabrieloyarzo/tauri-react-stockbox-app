import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useSnackbar } from "../../context/SnackbarContext";
import UserApi from "../../services/api/user.service";
import MainLayout from "../templates/MainLayout";
import UserForm from "../organisms/forms/UserForm";
import Reload from "../molecules/Reload";
import { iUser } from "../../functions/dataStructure";

const Users = () => {
  const { currentTable, setCurrentTable, setIsLoading, setTableColumns } =
    useTable();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(
    localStorage.getItem("users_page")
      ? Number(localStorage.getItem("users_page"))
      : 1
  );

  // Filters
  const [filterProps, setFilterProps] = useState(
    JSON.parse(localStorage.getItem("users_fprops")) ?? {
      offset: (page - 1) * 10,
    }
  );

  // Filters strings
  const filterStrings = Object.values(iUser)
    .filter((item) => item[1] === "string")
    .map((item) => item[0]);

  // Filters numbers
  const filterNumbers = Object.values(iUser)
    .filter((item) => item[1] === "number")
    .map((item) => item[0]);

  useEffect(() => {
    setTableColumns(Object.values(iUser).map((item) => item[0]));
    setCurrentTable("users");
  }, []);

  useEffect(() => {
    localStorage.setItem("users_page", page);
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: (page - 1) * 10,
    }));
  }, [page]);

  const [tableData, setTableData] = useState(null);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true);
    try {
      const users = await UserApi.getAllUsers(props);
      isFirstLoad &&
        (() => {
          showSnackbar(users.message, "success");
          setIsFirstLoad(false);
        })();

      setTableData(users.data);
      setCount(users.largo);

      localStorage.setItem("users_fprops", JSON.stringify(filterProps));
    } catch (error) {
      setError(error.response.data.message);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filterProps);
  }, [filterProps]);

  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (currentTable !== "users") {
    return null;
  }

  return (
    <>
      {!error ? (
        <>
          <MainLayout
            currentTable="users"
            data={tableData}
            fetchData={fetchData}
            setFormProps={setFormProps}
            toggleForm={() => setOpenForm(!openForm)}
            count={count}
            page={page}
            setPage={setPage}
            filterProps={filterProps}
            setFilterProps={setFilterProps}
            filterStrings={filterStrings}
            filterNumbers={filterNumbers}
          />
          {openForm && (
            <UserForm
              {...formProps}
              closeForm={() => setOpenForm(false)}
              filterProps={filterProps}
            />
          )}
        </>
      ) : (
        <Reload errorMessage={error} />
      )}
    </>
  );
};

export default Users;
