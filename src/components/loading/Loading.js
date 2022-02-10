import {Box, CircularProgress} from "@mui/material";

export default function Loading() {
    return <div style={{width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    </div>
}