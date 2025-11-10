import { Box, Typography } from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';

function EmptyState() {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
                color: 'grey.500'
            }}
        >
            <LayersIcon sx={{ fontSize: 48, mb: 2, color: 'grey.400' }} />
            <Typography variant="body1" color="inherit">
                No Tasks has been added.
            </Typography>
        </Box>
    );
}

export default EmptyState;