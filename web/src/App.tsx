import { TextEditor } from "./components/TextEditor";
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import "quill/dist/quill.snow.css"
import {v4 as uuidv4} from 'uuid'



function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to={`/documents/${uuidv4()}`}/>
          </Route>
          <Route path="/documents/:id">
           <TextEditor />
          </Route>
        </Switch>
      </Router>
     </div>
  );
}

export default App;
