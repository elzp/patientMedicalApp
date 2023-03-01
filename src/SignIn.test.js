import react from "react";
import { render, cleanup } from "@testing-library/react";

import SignIn from "./../SignIn";
afterEach(cleanup)

//tests if every component is rendered


test(`renders SignIn component`, async () => {
    const defuser  = {
        currentuser: {pacientId: "-5",
                      pacientUsername: "",
                      isLogin: false}
    };
    const { getByText } = render(<SignIn defaultuser={defuser} />)
    expect(getByText("SignIn page")).toBeInTheDocument()
})