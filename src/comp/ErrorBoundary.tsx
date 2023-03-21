import { useRouteError } from "react-router";

export function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    return <div>There is some problem, check console.</div>;
  }