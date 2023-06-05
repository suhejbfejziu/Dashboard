import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="p-16">
            <p className="text-xl mb-2">Sorry, the page you were looking for was not found.</p>
            <Button component={Link} to={'/'} variant="contained">Return to Home</Button>
        </div>
    )
}
