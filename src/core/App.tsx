import { History } from "history"
import AppRouter from "../routers/AppRouter"
import { AppConsumer } from "../context"
import { Spinner } from "../components"

interface Props {
    history: History
}

const App = ({ history }: Props) => {
    return (
        <AppConsumer>
            {context => {
                return context.bootstrap.loading ? <Spinner style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }} /> : <AppRouter history={history} />
            }}
        </AppConsumer>
    )
}

export default App