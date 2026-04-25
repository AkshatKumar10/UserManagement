import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const TableComponent = ({ columns, createData, createRows, rows }) => {
  createData();
  createRows();

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "background.paper",
      }}
    >
      <TableContainer
        sx={{
          overflowX: "auto",
          maxHeight: {
            xs: "400px",
            md: "600px",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    py: 2,
                    border: "none",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            <AnimatePresence>
              {rows.map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  component={motion.tr}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  sx={{
                    height: "70px",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.02)",
                    },
                    "& .MuiTableCell-root": {
                      borderColor: "rgba(0,0,0,0.05)",
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  {columns.map((column, colIndex) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={colIndex}
                        align={column.align}
                        sx={{
                          wordBreak: "break-all",
                          fontWeight: 500,
                        }}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
