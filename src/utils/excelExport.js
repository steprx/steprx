import { Download } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import FileSaver from "file-saver";
import * as XLSX from "xlsx/xlsx.mjs";

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    "application/vmd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
  const fileExtension = ".xlsx";
  console.log(excelData);
  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(JSON.parse(excelData));
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <IconButton onClick={() => exportToExcel(fileName)}>
      <Download sx={{ color: "#ffffff" }} />
    </IconButton>
  );
};

export default ExportExcel;
