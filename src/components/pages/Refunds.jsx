import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useSnackbar } from "../../context/SnackbarContext";
import RefundApi from "../../services/api/refund.service";
import MainLayout from "../templates/MainLayout";
import RefundForm from "../organisms/forms/RefundForm";
import Reload from "../molecules/Reload";
import { iRefund } from "../../functions/dataStructure";

const Refunds = () => {
  const { currentTable, setCurrentTable, setIsLoading, setTableColumns } =
    useTable();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(
    localStorage.getItem("refunds_page")
      ? parseInt(localStorage.getItem("refunds_page"))
      : 1
  );

  // Filters
  const [filterProps, setFilterProps] = useState(
    JSON.parse(localStorage.getItem("refunds_fprops")) ?? {
      offset: (page - 1) * 10,
    }
  );

  // Filters strings
  const filterStrings = Object.values(iRefund)
    .filter((item) => item[1] === "string")
    .map((item) => item[0]);

  // Filters numbers
  const filterNumbers = Object.values(iRefund)
    .filter((item) => item[1] === "number")
    .map((item) => item[0]);

  useEffect(() => {
    setTableColumns(Object.values(iRefund).map((item) => item[0]));
    setCurrentTable("refunds");
  }, []);

  useEffect(() => {
    localStorage.setItem("refunds_page", page);
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: (page - 1) * 10,
    }));
  }, [page]);

  // Table related
  const [tableData, setTableData] = useState(null);
  const [saleCodes, setSaleCodes] = useState([]);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true);
    try {
      const refunds = await RefundApi.getAllRefunds(props);
      isFirstLoad &&
        (() => {
          showSnackbar(refunds.message, "success");
          setIsFirstLoad(false);
        })();

      setTableData(refunds.data);
      setSaleCodes(refunds.saleCodes);
      setCount(refunds.largo);

      localStorage.setItem("refunds_fprops", JSON.stringify(filterProps));
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

  useEffect(() => {
    if (page > Math.ceil(count / 10)) {
      setPage(!(page <= 1) ? Math.ceil(count / 10) : 1);
    }
  }, [count]);

  // Forms
  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (currentTable !== "refunds") {
    return null;
  }

  return (
    <>
      {!error ? (
        <>
          <MainLayout
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
            <RefundForm
              {...formProps}
              closeForm={() => setOpenForm(false)}
              saleCodes={saleCodes}
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

export default Refunds;
