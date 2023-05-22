import { Router } from "./Routes/Router";
import GlobalStyle from "./globalStyles";

function App() {

  // const [posts, setPosts] = useState([])
  // const context = { posts, setPosts }

  return (
    <>
    {/* <GlobalContext.Provider value={context}> */}
      <GlobalStyle />
      <Router />
    {/* </GlobalContext.Provider> */}
    </>
  );
}

export default App;
