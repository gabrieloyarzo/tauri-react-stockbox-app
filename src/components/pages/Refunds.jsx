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

  const refundsPage = localStorage.getItem("refunds_page");
  const parsedRefundsPage =
    refundsPage !== null ? Number(refundsPage) : 1;

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(parsedRefundsPage);

  // Filters strings
  const filterStrings = Object.values(iRefund)
    .filter((item) => item[1] === "string")
    .map((item) => item[0]);

  // Filters numbers
  const filterNumbers = Object.values(iRefund)
    .filter((item) => item[1] === "number")
    .map((item) => item[0]);

  // Filters
  const [filterProps, setFilterProps] = useState(
    JSON.parse(localStorage.getItem("refunds_fprops")) ?? {
      offset: (page - 1) * 10,
      dato: "cod",
      desde: "",
      hasta: "",
      valor: "",
      intervalo: "igual",
      orden: "desc",
    }
  );

  // Table related
  const [tableData, setTableData] = useState(null);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true);
    try {
      const refunds = await RefundApi.getAllRefunds(props);
      console.log(refunds)
      isFirstLoad &&
        (() => {
          showSnackbar(refunds.message, "success");
          setIsFirstLoad(false);
        })();

      setTableData(refunds.data);
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
    setTableColumns(Object.values(iRefund).map((item) => item[0]));
    setCurrentTable("refunds");
  }, []);

  useEffect(() => {
    fetchData(filterProps);
    const offset = filterProps?.offset ?? 0;
    const pagina = (offset + 10) / 10;
    setPage(pagina);
    localStorage.setItem("refunds_page", pagina);
  }, [filterProps]);

  // Forms
  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (
    isFirstLoad &&
    (currentTable !== "refunds" || page !== parsedRefundsPage)
  ) {
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
