import { Button, Spinner } from "react-bootstrap";

export default function ButtonLoading({ variant="primary", type="submit", loading, children }){

    return(
    <>
    <Button type={type} variant={variant} disabled={loading}>
        { loading && <Spinner animation="border" size="sm"></Spinner> }
        { children }
    </Button>
    </>)
}