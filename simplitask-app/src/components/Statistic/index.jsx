import { Box, Card, Typography, LinearProgress } from '@mui/material';
import './index.css';

function Statistic({ total, active, completed }) {
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <Box className="statistic-container">
            <Card className="statistic-card statistic-total">
                <Typography
                    className="statistic-label"
                    component="div"
                    sx={{ fontSize: 22, fontWeight: 400, color: '#222', mb: '8px' }}
                >
                    Total
                </Typography>
                <Typography
                    className="statistic-value"
                    component="div"
                    sx={{ fontSize: 56, fontWeight: 700, color: '#222', lineHeight: 1 }}
                >
                    {total}
                </Typography>
            </Card>
            <Card className="statistic-card statistic-active">
                <Typography
                    className="statistic-label"
                    component="div"
                    sx={{ fontSize: 22, fontWeight: 400, color: '#222', mb: '8px' }}
                >
                    Active
                </Typography>
                <Typography
                    className="statistic-value"
                    component="div"
                    sx={{ fontSize: 56, fontWeight: 700, color: '#222', lineHeight: 1 }}
                >
                    {active}
                </Typography>
            </Card>
            <Card className="statistic-card statistic-completed">
                <Typography
                    className="statistic-label"
                    component="div"
                    sx={{ fontSize: 22, fontWeight: 400, color: '#222', mb: '8px' }}
                >
                    Completed
                </Typography>
                <Typography
                    className="statistic-value"
                    component="div"
                    sx={{ fontSize: 56, fontWeight: 700, color: '#222', lineHeight: 1 }}
                >
                    {completed}
                </Typography>
            </Card>
            <Card className="statistic-card statistic-rate">
                <Typography
                    className="statistic-label"
                    component="div"
                    sx={{ fontSize: 22, fontWeight: 400, color: '#222', mb: '8px' }}
                >
                    Completion Rate
                </Typography>
                <Box className="statistic-rate-bar">
                    <LinearProgress
                        variant="determinate"
                        value={completionRate}
                        className="statistic-progress"
                    />
                    <Typography
                        className="statistic-rate-value"
                        component="div"
                        sx={{ fontSize: 18, fontWeight: 500, color: '#222', minWidth: 40, textAlign: 'right' }}
                    >
                        {completionRate}%
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
}

export default Statistic;