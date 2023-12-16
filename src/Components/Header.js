import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { Outlet, Link, useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            <AppBar position="absolute" elevation={0} style={{ background: "white", color: "black" }}>
                <Container maxWidth="lg" sx={{ mt: .25, mb: .25 }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "22px" }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black' }} reloadDocument>
                                AceTask
                            </Link>
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button color="inherit" onClick={() => {
                                localStorage.removeItem("apiToken");
                                localStorage.removeItem("school");

                                navigate("/login");
                            }}>Logout</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet></Outlet>
        </>
    )
}

export default Header