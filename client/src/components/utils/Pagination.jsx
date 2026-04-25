import { Pagination, Box, Typography } from "@mui/material";

export default function PaginationComponent({
  numberOfPages,
  handleChange,
  page,
  className,
}) {
  return (
    <Box className={className} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2, mb: 6, gap: 2, fontFamily: "Outfit, sans-serif" }}>
      <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
        Page {page} of {numberOfPages}
      </Typography>
      <Pagination
        count={numberOfPages}
        page={page}
        onChange={handleChange}
        shape="rounded"
        color="primary"
        size="large"
        sx={{
          "& .MuiPaginationItem-root": {
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            borderRadius: "10px",
            border: "1px solid rgba(0,0,0,0.05)",
          },
          "& .Mui-selected": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }
        }}
      />
    </Box>
  );
}
