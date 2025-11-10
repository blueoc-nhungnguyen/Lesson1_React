import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function TopBar() {
    return(
      <AppBar position='static' sx={{backgroundColor:'black', boxShadow: 'none'}}>
           <Toolbar className="justify-start"> {/* Đổi thành justify-start */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          SimpliTask
        </Typography>
      </Toolbar>
      </AppBar>
    )
}
export default TopBar;