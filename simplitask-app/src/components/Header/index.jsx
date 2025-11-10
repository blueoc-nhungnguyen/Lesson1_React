import { Box, Typography } from "@mui/material";
import WavingHandTwoToneIcon from '@mui/icons-material/WavingHandTwoTone';

function HeaderApp() {
  return (
    <Box sx={{ px: 8 }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 1
      }}>
        <WavingHandTwoToneIcon sx={{ fontSize: 40, mr: 1 }} />
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: 48,
            color: "#222",
            lineHeight: 1.1,
            letterSpacing: "-1px"
          }}
        >
          Welcome, Nhung!
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          component="div"
          color="text.secondary"
          sx={{
            fontSize: 18,
            fontWeight: 400,
            mb: 2
          }}
        >
          Simplify your Daily tasks! Organize your to-do list efficiently and
          stay productive.
        </Typography>
      </Box>
    </Box>
  );
}
export default HeaderApp;