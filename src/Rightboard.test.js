import react from "react";
import { render, cleanup } from "@testing-library/react";
afterEach(cleanup)
import Rightboard from "./../SignIn";


//tests if every component is rendered


test(`renders Rightboard component`, async () => {
    const defuser  = {
        currentuser: {pacientId: "-5",
                      pacientUsername: "",
                      isLogin: false}
    };
    const { getByText } = render(
        <Rightboard 
        changeuser={''} 
        defaultuser={defuser}
         />
         )
    expect(getByText("SignIn page")).toBeInTheDocument()
})