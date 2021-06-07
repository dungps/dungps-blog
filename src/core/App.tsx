import { History } from "history"
import AppRouter from "../routers/AppRouter"
import { BootstrapContext } from "../modules/bootstrap"
import { Spinner } from "../components"

interface Props {
    history: History
}

const App = ({ history }: Props) => {
    return (
        <BootstrapContext.Consumer>
            {context => {
                return context.loading ? <Spinner style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }} /> : <AppRouter history={history} />
            }}
        </BootstrapContext.Consumer>
    )
}

export default App